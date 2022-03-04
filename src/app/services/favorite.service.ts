import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CityPost } from '../models/cityPost.model';
import { utilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private KEY: string = 'favCitiesDB';
  private _cities$ = new BehaviorSubject<CityPost[]>([]);
  public cities$ = this._cities$.asObservable();
  
  constructor() { }
// Query favorite cities from LS and state
  public query(): BehaviorSubject<CityPost[]> {
    let favCities = utilService.load(this.KEY);
    this._cities$.next(favCities);
    return this._cities$;
  }
  // Remove favorite city from LS and state
  public remove(city:string):void{
    const cities = this._cities$.getValue();
    const idx = cities.findIndex(item => item.LocalizedName === city);
    cities.splice(idx, 1);
    this._cities$.next(cities);
    utilService.save(this.KEY, cities);
  }

  //Save facovite City to LS and update state
  public save(cityObj: CityPost): Observable<CityPost[]>{
    const cities = this._cities$.getValue();
    cities.push(cityObj);
    utilService.save(this.KEY,cities);
    this._cities$.next(cities);
    return of(cities);
  }
  public isFavoriteCity(city:string):boolean{
    // Returns a boolean if item found in the array
    return this._cities$.getValue().some(item=>item.LocalizedName === city);
  }  
}
