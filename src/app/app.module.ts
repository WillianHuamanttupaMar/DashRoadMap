import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { AdvanceMonthComponent } from './pages/advance-month/advance-month.component';
import { ResporteZoneComponent } from './pages/resporte-zone/resporte-zone.component';
import { VisitClientsComponent } from './pages/visit-clients/visit-clients.component';
import { ArrivaltrucksComponent } from './pages/arrivaltrucks/arrivaltrucks.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AdvanceMonthComponent,
    ResporteZoneComponent,
    VisitClientsComponent,
    ArrivaltrucksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
