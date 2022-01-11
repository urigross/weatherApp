import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CityPost } from 'src/app/models/cityPost.model';
import { Post } from 'src/app/models/post.model';
import { FavoriteService } from 'src/app/services/favorite.service';
import { WeatherService } from 'src/app/services/weather.service';

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
  favCities$!: Observable<string[]>;
  subscription!: Subscription;
  isFavorite: boolean = false;
  //favCities: string[] = [];
  errMsg: string = '';


  constructor(private weatherService: WeatherService, private favoriteService: FavoriteService) { }

  // Load favorite cities list.
  ngOnInit(): void {
    this.favCities$ = this.favoriteService.query();
    //this.favCities$.subscribe(cities => this.favCities = cities)
    // Get locations
    //this.getLocationQuery();
    // this.getPosts();    
  }
  // get locations object from Api & fill the cities list
  getLocationQuery(autoCompleteCity: string): void {
    if (autoCompleteCity) {
      this.weatherService.locationQuery(autoCompleteCity).subscribe(
        (response: any) => {
          this.citiesPost = response
          this.citiesNamesKeys = this.citiesPost.map(city => {
            let cityObject = { Key: '', LocalizedName: '' };
            cityObject['Key'] = city.Key;
            cityObject['LocalizedName'] = city.LocalizedName;
            return cityObject
          })
          this.citiesNames = this.citiesNamesKeys.map(city => city.LocalizedName);
        },
      )
    }
  }
  // get weather posts
  getPosts(cityKey: string): void {
    console.log('getting from service getposts')
    this.weatherService.getPosts(cityKey).subscribe(
      (response: any) => { this.post = response },
      (err: string) => { console.log('There is an error', err) }
    )
  }

  onEmitAutoCompleteStr(data: string): void {
    // Get the location autocomplete list from API
    this.getLocationQuery(data);
    // this.chosenCity = data;
    // // Get city index
    // const idx: number = this.getcityIdx(data);
    // if (idx === -1 ) return;
    // const cityKey =this.citiesNamesKeys[idx].Key;
    // this.getPosts(cityKey);
  }

  getcityIdx(cityName: string): number {
    return this.citiesNamesKeys.findIndex(city => city.LocalizedName === cityName);
  }
// Pass city name and get the forecast for this city.
  onEmitChosenCity(data: string): void {
    this.chosenCity = data;
    // get city index
    const idx: number = this.getcityIdx(data);
    if (idx === -1) return;
    const cityKey = this.citiesNamesKeys[idx].Key;
    // Get weather forecast by the city key
    this.getPosts(cityKey);
    // Get favoriteSign for the chosen city
    this.isFavorite = this.favoriteService.isFavoriteCity(data);
    // Get favorite cities list
  }
  async onUpdatedFav(data: boolean) {
    console.log('Entered onUpdatedFav');
    if (data)
    // In case toogle On favorite - Add city to favCities
    {
      //this.favCities.push(this.chosenCity)
      //console.log('weatherApp.ts onUpdatedFav() favCities',this.favCities)
      try {
        await this.favoriteService.save(this.chosenCity).toPromise();
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
