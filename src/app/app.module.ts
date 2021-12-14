import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { AddflightComponent } from './components/addflight/addflight.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { EditflightComponent } from './components/editflight/editflight.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    FlightListComponent,
    NavComponent,
    AddflightComponent,
    HomeComponent,
    AboutComponent,
    EditflightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
