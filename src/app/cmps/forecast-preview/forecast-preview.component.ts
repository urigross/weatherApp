import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forecast-preview',
  templateUrl: './forecast-preview.component.html',
  styleUrls: ['./forecast-preview.component.scss']
})
export class ForecastPreviewComponent implements OnInit {
  
  @Input() forecasts: any;
  constructor() { }

  ngOnInit(): void {
  }

}
