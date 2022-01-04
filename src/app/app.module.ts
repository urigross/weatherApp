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
import { AutocompleteFilterComponent } from './cmps/autocomplete-filter/autocomplete-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { SearchFilterPipe } from './pipes/search-filter.pipe';




@NgModule({
  declarations: [
    AppComponent,
    WeatherAppComponent,
    HeaderComponent,
    FavoritsComponent,
    ForecastsListComponent,
    ForecastPreviewComponent,
    AutocompleteFilterComponent,
    ClickOutsideDirective,
    SearchFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
