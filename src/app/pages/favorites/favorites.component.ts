import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CityPost } from 'src/app/models/cityPost.model';
import { FavoriteService } from 'src/app/services/favorite.service';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favCitiesPost$!: Observable<CityPost[]>;
  constructor( private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.favCitiesPost$ = this.favoriteService.query();
    console.log('favorites component ngOnInit()',this.favCitiesPost$.subscribe(item=> console.log('item',item)));

  }

}
