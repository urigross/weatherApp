import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-preview',
  templateUrl: './favorite-preview.component.html',
  styleUrls: ['./favorite-preview.component.scss']
})
export class FavoritePreviewComponent implements OnInit {
@Input() favCity: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
