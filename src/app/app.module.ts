import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { AdvanceMonthComponent } from './pages/advance-month/advance-month.component';
import { FormsModule } from '@angular/forms';
import { EntregaClientesComponent } from './pages/entrega-clientes/entrega-clientes.component';
import { MercadoSeguridadComponent } from './pages/mercado-seguridad/mercado-seguridad.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RetornoUnidadesT2Component } from './pages/retorno-unidades-t2/retorno-unidades-t2.component';


@NgModule({
  declarations: [
    AppComponent,
    AdvanceMonthComponent,
    EntregaClientesComponent,
    MercadoSeguridadComponent,
    DashboardComponent,
    RetornoUnidadesT2Component
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
