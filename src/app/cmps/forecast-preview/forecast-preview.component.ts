import { Component, OnInit, Input } from '@angular/core';
import { DailyForecast } from 'src/app/models/dailyForecast.model';

@Component({
  selector: 'app-forecast-preview',
  templateUrl: './forecast-preview.component.html',
  styleUrls: ['./forecast-preview.component.scss']
})
export class ForecastPreviewComponent implements OnInit {
  @Input() dailyForecast!: DailyForecast;
  constructor() { }

  ngOnInit(): void {
  }
}
