import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';

const apiKeys = [
  '1O5x6iWGX2PXaKBdLiSGS82FD9V6HScH',
  '1HTEFW2KdbvXG4CPLWGOxJFpP097Q58e',
  'pHmcrKbKZfiy2EAbQR1b1M80yG58k12G',
]
//const API_KEY = '1O5x6iWGX2PXaKBdLiSGS82FD9V6HScH';
//const API_KEY = '1HTEFW2KdbvXG4CPLWGOxJFpP097Q58e';
//const API_KEY = 'pHmcrKbKZfiy2EAbQR1b1M80yG58k12G';

//const AUTOCOMPLETE_MOCK_URL = `https://api.npoint.io/2ba8eb9f07495fd75a71`;
//const FORECAST_URL = 'https://api.npoint.io/6c9d1ba47b3a61ef639a';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  constructor(private http: HttpClient) { }
  
  // returns autocomplete cities and citycodes list ojbect
  public async locationQuery(autoCompleteCity:string) :Promise<any> {
    
    var AUTOCOMPLETE_URL = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKeys[0]}&q=${autoCompleteCity}`;
    // return this.http.get(AUTOCOMPLETE_MOCK_URL);
    return  await this.http.get(AUTOCOMPLETE_URL);
  }
  
  // HttpRequest returns Observable of object with cities forecast
  public  async getPosts(cityKey:string): Promise<Observable<any>> {
    const FORECAST_URL = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKeys[0]}&language=en-us&metric=true`;
   // const FORECAST_URL = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}`;

    return  await this.http.get(FORECAST_URL);
  }
}
