import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss']
})
export class WeatherAppComponent implements OnInit {
  public forecastsObj!:any;
  constructor( private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  getWeather():void{
    this.forecastsObj = this.weatherService.query();
    // this.dailyForecasts = this.forecasts.DailyForecasts

  }

}
