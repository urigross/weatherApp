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
    console.log('Entered FavoriteService query()')
    let favCities = utilService.load(this.KEY);
    this._cities$.next(favCities);
    console.log('favoriteService query() _cities:',this._cities$.getValue());
    return this._cities$;
  }
  public remove(city:string):void{
    console.log('Entered FavoriteService remove()')
    const cities = this._cities$.getValue();
    const idx = cities.findIndex(item => item === city);
    cities.splice(idx, 1);
    this._cities$.next(cities);
    console.log('FavoriteService remove() _cities$',this._cities$.getValue())
    utilService.save(this.KEY, cities);
  }
  public save(city:string): Observable<string[]>{
    console.log('Entered FavoriteService save()')
    const cities = this._cities$.getValue();
    console.log(' favoriteService save() _cities$.getValue: ',this._cities$.getValue());
    cities.push(city);
    console.log(' favoriteService save() cities after push city: ',cities);
    utilService.save(this.KEY,cities);
    this._cities$.next(cities);
    console.log('FavoriteService save() _cities$',this._cities$.getValue())
    return of(cities);
  }  
}
