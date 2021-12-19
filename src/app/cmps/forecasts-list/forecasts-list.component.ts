import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.scss']
})
export class ForecastsListComponent implements OnInit {
  
  @Input() forecasts!:[] | null;
  constructor() { }

  ngOnInit(): void {
  }

}
