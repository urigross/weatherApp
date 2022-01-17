import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CityPost } from 'src/app/models/cityPost.model';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {
  @Input() favCitiesPost: CityPost[] | null= []

  constructor() { }

  ngOnInit(): void {
  }

}
