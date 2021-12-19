import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritsComponent } from './pages/favorits/favorits.component';
import { WeatherAppComponent } from './pages/weather-app/weather-app.component';

const routes: Routes = [
  { path: 'favorits', component: FavoritsComponent},
  { path: '', component: WeatherAppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
