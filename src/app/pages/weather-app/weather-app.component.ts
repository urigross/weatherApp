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
  citiesNames: string[]=[]
  constructor( private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.locationQuery().subscribe(
      (response:any) => {
        this.citiesPost = response
        this.citiesNames = this.citiesPost.map(city => city.LocalizedName)
      },
    )
    this.weatherService.getPosts().subscribe(
      (response:any) => {this.post = response },
      (err:string)=>{console.log('There is an error',err)}
    )
  }
}
