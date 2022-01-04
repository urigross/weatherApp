import { Component, OnInit } from '@angular/core';
import { CityPost } from 'src/app/models/cityPost.model';
import { Post } from 'src/app/models/post.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss']
})
export class WeatherAppComponent implements OnInit {
  post: Post ={
    Headline:{Text:''},
    DailyForecasts:[]
  };
  citiesPost: CityPost[] = [];
  citiesNamesKeys: CityPost[] = [];
  citiesNames: string[]=[];
  chosenCity: string ='';
  constructor( private weatherService: WeatherService) { }

  ngOnInit(): void {
    // Get locations
    //this.getLocationQuery();
    // this.getPosts();    
  }
// get locations object
  getLocationQuery(autoCompleteCity:string):void{
    if(autoCompleteCity){
      console.log('getting from service locationquery')
      this.weatherService.locationQuery(autoCompleteCity).subscribe(
        (response:any) => {
          this.citiesPost = response
          this.citiesNamesKeys = this.citiesPost.map(city => {
            let cityObject = {Key:'', LocalizedName:''};
            cityObject['Key'] = city.Key;
            cityObject['LocalizedName'] = city.LocalizedName;
            return cityObject
          })
          this.citiesNames = this.citiesNamesKeys.map(city=>city.LocalizedName);
        },
      )
    }
  }
// get weather posts
  getPosts(cityKey:string):void{
    console.log('getting from service getposts')
    this.weatherService.getPosts(cityKey).subscribe(
      (response:any) => {this.post = response },
      (err:string)=>{console.log('There is an error',err)}
    )
  }

  onEmitAutoCompleteStr(data:string):void{
    this.getLocationQuery(data);
    // this.chosenCity = data;
    // // Get city index
    // const idx: number = this.getcityIdx(data);
    // if (idx === -1 ) return;
    // const cityKey =this.citiesNamesKeys[idx].Key;
    // this.getPosts(cityKey);
  }

  getcityIdx(cityName:string):number{
    return this.citiesNamesKeys.findIndex(city=>city.LocalizedName === cityName);
  }

  onEmitChosenCity(data:string):void{
    this.chosenCity = data;
    // get city index
    const idx: number = this.getcityIdx(data);
    if ( idx === -1 ) return;
    const cityKey = this.citiesNamesKeys[idx].Key;
    // Get weather forecast by the city key
    this.getPosts(cityKey);
  }

}
