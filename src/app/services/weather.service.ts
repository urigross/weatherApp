import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';

const apiKeys: string[] = [
  '1O5x6iWGX2PXaKBdLiSGS82FD9V6HScH',
  '1HTEFW2KdbvXG4CPLWGOxJFpP097Q58e',
  'pHmcrKbKZfiy2EAbQR1b1M80yG58k12G',
]
const apiKeysIdx$ = new BehaviorSubject<number>(0);

//const AUTOCOMPLETE_MOCK_URL = `https://api.npoint.io/2ba8eb9f07495fd75a71`;
//const FORECAST_URL = 'https://api.npoint.io/6c9d1ba47b3a61ef639a';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  // returns autocomplete cities and citycodes list ojbect with Accuweather Dynamic free key.
  public async locationQuery(autoCompleteCity: string): Promise<any> {
    var AUTOCOMPLETE_URL = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKeys[apiKeysIdx$.getValue()]}&q=${autoCompleteCity}`;
    // return this.http.get(AUTOCOMPLETE_MOCK_URL);
    const citiesList =  this.http.get(AUTOCOMPLETE_URL);
    const err = citiesList.pipe(catchError(val=>of('I cought error: ',val)));
    err.subscribe(val=>{
      // Change to next Accuweather key index 
      console.log(val['message']);

      if (val['message']) {apiKeysIdx$.next(this._getApikeyidx())}
      else{
        console.log('no error');
      };
    });
    return citiesList;         
  }

  // Gets new index for api key generator
  private _getApikeyidx():number{
    let idx: number
    if ( apiKeysIdx$.getValue() <= apiKeys.length -2 ){
      idx = apiKeysIdx$.getValue() + 1;
    }
    else{
      idx = 0;            
    }
    console.log(idx);
    return idx;
  }

  // HttpRequest returns Observable of object with cities forecast
  public async getPosts(cityKey: string): Promise<Observable<any>> {
    const FORECAST_URL = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKeys[apiKeysIdx$.getValue()]}&language=en-us&metric=true`;

    const posts = await this.http.get(FORECAST_URL);
    const err = posts.pipe(catchError(val=>of('I cought error: ',val)));
    err.subscribe(val=>{
      // Change to next Accuweather key index  
      apiKeysIdx$.next(this._getApikeyidx());
    });
    return posts;
  }
}
