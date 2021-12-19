import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss']
})
export class WeatherAppComponent implements OnInit {
  public forecasts!:any;
  myImg: string = 'assets/images/weather/1.png';
  constructor( private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  getWeather():void{
    this.forecasts = this.weatherService.query();
    // this.dailyForecasts = this.forecasts.DailyForecasts

  }

}
