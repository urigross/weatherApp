import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FavoriteService } from 'src/app/services/favorite.service';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favCities$!: Observable<string[]>;
  constructor( private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.favCities$ = this.favoriteService.query();
    console.log('favorites component ngOnInit()',this.favCities$.subscribe(item=> console.log('item',item)));

  }

}
