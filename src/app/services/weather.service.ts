import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';


const ROOT_URL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/212511?apikey=1O5x6iWGX2PXaKBdLiSGS82FD9V6HScH';
//  const ROOT_URL = 'https://api.npoint.io/6c9d1ba47b3a61ef639a';

var posts: any;
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}
  
  public query() {
    // var data:any = this.http.get(ROOT_URL +'/DailyForecasts');
    var data:any = this.http.get(ROOT_URL);
    return data; 
    // return this.http.get(ROOT_URL + '/posts'); 
  }
}
