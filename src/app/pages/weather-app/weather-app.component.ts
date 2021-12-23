import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss']
})
export class WeatherAppComponent implements OnInit {
  post!: Post;
  constructor( private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getPosts().subscribe(
      (response:any) => {this.post = response },
      // (response:any) => {this.post.DailyForecasts = response.DailyForecasts; this.post.Headline.Text = response.Headline.Text },
      (err:string)=>{console.log('There is an error',err)}
    )
  }
}
