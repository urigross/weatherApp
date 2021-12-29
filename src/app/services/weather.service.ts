import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';

const API_KEY = '1O5x6iWGX2PXaKBdLiSGS82FD9V6HScH';
const AUTOCOMPLETE_URL = `https://api.npoint.io/2ba8eb9f07495fd75a71`;
//const AUTOCOMPLETE_URL = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=tel`;
//const FORECAST_URL = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/212511?apikey=${API_KEY}`;
const FORECAST_URL = 'https://api.npoint.io/6c9d1ba47b3a61ef639a';

var posts: any;
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  public locationQuery() {
    return this.http.get(AUTOCOMPLETE_URL);
   }

  // HttpRequest returns Observable
  public getPosts(): any {
    return this.http.get(FORECAST_URL);
  }
}
