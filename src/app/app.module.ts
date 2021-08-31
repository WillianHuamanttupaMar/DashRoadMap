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
import { ArrivaltrucksComponent } from './pages/arrivaltrucks/arrivaltrucks.component';
import { FormsModule } from '@angular/forms';
import { EntregaClientesComponent } from './pages/entrega-clientes/entrega-clientes.component';
import { ClientvisitCalidadComponent } from './pages/clientvisit-calidad/clientvisit-calidad.component';
import { MercadoSeguridadComponent } from './pages/mercado-seguridad/mercado-seguridad.component';
import { ClienteServicioComponent } from './pages/cliente-servicio/cliente-servicio.component';
import { RechazosComponent } from './pages/rechazos/rechazos.component';
import { ProductividadPOCComponent } from './pages/productividad-poc/productividad-poc.component';


@NgModule({
  declarations: [
    AppComponent,
    AdvanceMonthComponent,
    ResporteZoneComponent,
    ArrivaltrucksComponent,
    EntregaClientesComponent,
    ClientvisitCalidadComponent,
    MercadoSeguridadComponent,
    ClienteServicioComponent,
    RechazosComponent,
    ProductividadPOCComponent
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
