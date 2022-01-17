import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.scss']
})
export class ForecastsListComponent implements OnInit {
  
  @Input() post!:Post;
  @Input() chosenCity:string='';
  constructor() { }

  ngOnInit(): void {
  }
}
