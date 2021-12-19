import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherAppComponent } from './pages/weather-app/weather-app.component';
import { HeaderComponent } from './cmps/header/header.component';
import { FavoritsComponent } from './pages/favorits/favorits.component';
import { HttpClientModule } from '@angular/common/http';
import { ForecastsListComponent } from './cmps/forecasts-list/forecasts-list.component';
import { ForecastPreviewComponent } from './cmps/forecast-preview/forecast-preview.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherAppComponent,
    HeaderComponent,
    FavoritsComponent,
    ForecastsListComponent,
    ForecastPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
