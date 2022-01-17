import { Component, Input, OnInit } from '@angular/core';
import { CityPost } from 'src/app/models/cityPost.model';

@Component({
  selector: 'app-favorite-preview',
  templateUrl: './favorite-preview.component.html',
  styleUrls: ['./favorite-preview.component.scss']
})
export class FavoritePreviewComponent implements OnInit {
@Input() favCityPost: CityPost = {Key:'',LocalizedName:''};
  constructor() { }

  ngOnInit(): void {
  }
}
