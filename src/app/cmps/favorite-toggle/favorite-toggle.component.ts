import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-favorite-toggle',
  templateUrl: './favorite-toggle.component.html',
  styleUrls: ['./favorite-toggle.component.scss']
})
export class FavoriteToggleComponent implements OnInit {
  @Input() isFavorite: boolean = false;
  @Output() updatedFavorite : EventEmitter<boolean> = new EventEmitter();



  constructor(library: FaIconLibrary) {
    library.addIcons(fasStar, farStar)
   }
   onToggleFavorite():void{
     this.isFavorite = !this.isFavorite;
     this.updatedFavorite.emit(this.isFavorite);
   }

  ngOnInit(): void {
  }

}
