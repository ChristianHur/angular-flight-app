import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { AddflightComponent } from './components/addflight/addflight.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { EditflightComponent } from './components/editflight/editflight.component';

@NgModule({
  declarations: [
    FooterComponent,
    FlightListComponent,
    NavComponent,
    AddflightComponent,
    HomeComponent,
    AboutComponent,
    EditflightComponent
  ],
  imports:[
     FormsModule, ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    FlightListComponent,
    NavComponent,
    AddflightComponent,
    HomeComponent,
    AboutComponent,
    EditflightComponent
  ],
})
export class ComponentsModule { }
