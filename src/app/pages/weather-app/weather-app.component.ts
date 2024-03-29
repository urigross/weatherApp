import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { CityPost } from 'src/app/models/cityPost.model';
import { Post } from 'src/app/models/post.model';
import { FavoriteService } from 'src/app/services/favorite.service';
import { WeatherService } from 'src/app/services/weather.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss']
})
export class WeatherAppComponent implements OnInit {
  post: Post = {
    Headline: { Text: '' },
    DailyForecasts: []
  };
  citiesPost: CityPost[] = [];
  citiesNamesKeys: CityPost[] = [];
  citiesNames: string[] = [];
  chosenCity: string = '';
  favCities$ = new BehaviorSubject<CityPost[]>([]);
  subscription!: Subscription;
  isFavorite: boolean = false;
  errMsg: string = '';

  constructor(
    private weatherService: WeatherService, private favoriteService: FavoriteService,
    private route: ActivatedRoute, private router: Router) { }

  // Load favorite cities list.
  ngOnInit(): void {
    this.getFavCities();
    // get favorite city from favorites page by router params
    this.getFavCity();
    this._getCityAndForecast(this.chosenCity);
  }
  getFavCities(): void {
    console.log('weatherApp page getFavCities()')
    this.favCities$ = this.favoriteService.query();
  }
  getFavCity(): void {
    console.log('weatherApp page getFavCity()')
    const data: string = this.route.snapshot.paramMap.get('favCity')!;   // Gets null if nothing received from params
    if (data) {
      this.citiesNamesKeys = this.favCities$.getValue();
      this.chosenCity = data;
    }
    this._getCityAndForecast(data);
  }
  // get locations object from Api & fill the cities list
  async getLocationQuery(autoCompleteCity: string): Promise<void> {
    if (autoCompleteCity) {
      const ans = await this.weatherService.locationQuery(autoCompleteCity);
      ans.subscribe(
        (response: any) => {
          this.citiesPost = response
          this.citiesNamesKeys = this.citiesPost.map(city => {
            let cityObject = { Key: '', LocalizedName: '' };
            cityObject['Key'] = city.Key;
            cityObject['LocalizedName'] = city.LocalizedName;
            return cityObject
          })
          if (this.citiesNamesKeys) {
            this._mapCityNames(this.citiesNamesKeys)
          }
          else {
            this.getLocationQuery(autoCompleteCity);
          };
        },
      )
    }
  }

  private _mapCityNames(citiesWithKeys: CityPost[]): void {
    this.citiesNames = this.citiesNamesKeys.map(city => city.LocalizedName);
  }
  // get weather posts
  async getPosts(cityKey: string): Promise<void> {
    console.log('getting from service getposts')
    const ans = await this.weatherService.getPosts(cityKey);
    ans.subscribe(
      (response: any) => {
        this.post = response
        if (!this.post) this.getPosts(cityKey);
      }
    )

  }

  onEmitAutoCompleteStr(data: string): void {
    // Get the location autocomplete list from API
    this.getLocationQuery(data);
  }

  private _getcityIdx(cityName: string): number {
    console.log('weather-app cmps _getcityIdx() cityName:', cityName, 'citiesNamesKeys', this.citiesNamesKeys);
    return this.citiesNamesKeys.findIndex(city => city.LocalizedName === cityName);
  }

  private _getCityKey(cityName: string): string {
    const idx: number = this._getcityIdx(cityName);
    return this.citiesNamesKeys[idx].Key;
  }
  // Pass city name and get the forecast for this city.
  onEmitChosenCity(data: string): void {
    console.log('weather-app cmps onEmitChosenCity()');
    this.chosenCity = data;
    this._getCityAndForecast(data);
  }

  private _getCityAndForecast(city: string): void {
    console.log('Entered weather-app cmps _getCityAndForecast()');
    // get city index if city match 
    console.log('weather-app cmps _getCityAndForecast() city:', city);
    const idx: number = this._getcityIdx(city);
    console.log('weather-app cmps _getCityAndForecast() idx:', idx);
    if (idx === -1) return;
    const cityKey = this.citiesNamesKeys[idx].Key;
    console.log('weather-app cmps _getCityAndForecast() cityKey:', cityKey);
    // Get weather forecast by the city key
    this.getPosts(cityKey);
    // Get favoriteSign for the chosen city
    this.isFavorite = this.favoriteService.isFavoriteCity(city);
    console.log('weather-app cmps _getCityAndForecast() isFavorite:', this.isFavorite);
  }

  async onUpdatedFav(data: boolean) {
    console.log('Entered onUpdatedFav');
    if (data)
    // In case toogle On favorite - Add city to favCities
    {
      try {
        const cityObj: CityPost = { Key: this._getCityKey(this.chosenCity), LocalizedName: this.chosenCity }
        await this.favoriteService.save(cityObj).toPromise();
      } catch (err) {
        this.errMsg = err as string;
        console.log(err);
      }
    }
    else {
      try {
        // this._removeFavCity(this.chosenCity)
        this.favoriteService.remove(this.chosenCity);
      } catch (err) {
        this.errMsg = err as string;
        console.log(err);
      }
    }
  }
}
