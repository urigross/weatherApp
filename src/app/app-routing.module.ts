import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherAppComponent } from './pages/weather-app/weather-app.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

const routes: Routes = [
  { path: 'favorites', component: FavoritesComponent},
  { path: '', component: WeatherAppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
