import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { utilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private KEY: string = 'favCitiesDB';
  private _cities$ = new BehaviorSubject<string[]>([]);

  public cities$ = this._cities$.asObservable();
  
  constructor() { }

  public query(): Observable<string[]> {
    let favCities = utilService.load(this.KEY);
    this._cities$.next(favCities);
    return this._cities$;
  }
  public remove(city:string):void{
    const cities = this._cities$.getValue();
    const idx = cities.findIndex(item => item === city);
    cities.splice(idx, 1);
    this._cities$.next(cities);
    utilService.save(this.KEY, cities);
  }
  public save(city:string): Observable<string[]>{
    const cities = this._cities$.getValue();
    cities.push(city);
    utilService.save(this.KEY,cities);
    this._cities$.next(cities);
    return of(cities);
  }  
}
