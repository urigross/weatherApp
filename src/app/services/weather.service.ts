import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';


// const ROOT_URL = 'https://jsonplaceholder.typicode.com';
const ROOT_URL = 'https://api.npoint.io/6c9d1ba47b3a61ef639a';
var posts: any;
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}
  
  public query() {
    return this.http.get(ROOT_URL +'/DailyForecasts'); 
    // return this.http.get(ROOT_URL + '/posts'); 
  }
}
