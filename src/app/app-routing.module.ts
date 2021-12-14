import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { AddflightComponent } from './components/addflight/addflight.component';
import { EditflightComponent } from './components/editflight/editflight.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'about', component: AboutComponent},
  {path:'add', component: AddflightComponent},
  {path: "flights", component: FlightListComponent},
  {path: "edit/:id", component: EditflightComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
