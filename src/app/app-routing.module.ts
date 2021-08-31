import { ProductividadPOCComponent } from './pages/productividad-poc/productividad-poc.component';
import { RechazosComponent } from './pages/rechazos/rechazos.component';
import { ClienteServicioComponent } from './pages/cliente-servicio/cliente-servicio.component';
import { MercadoSeguridadComponent } from './pages/mercado-seguridad/mercado-seguridad.component';
import { ClientvisitCalidadComponent } from './pages/clientvisit-calidad/clientvisit-calidad.component';
import { EntregaClientesComponent } from './pages/entrega-clientes/entrega-clientes.component';
import { ResporteZoneComponent } from './pages/resporte-zone/resporte-zone.component';
import { AdvanceMonthComponent } from './pages/advance-month/advance-month.component';
import { ArrivaltrucksComponent } from './pages/arrivaltrucks/arrivaltrucks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'avance-reporte',
    component: AdvanceMonthComponent
  },
  {
    path: 'reporte-zona',
    component: ResporteZoneComponent
  },

  {
    path: 'llegada-reporte',
  component: ArrivaltrucksComponent
  },
  {
    path: 'entrega-cliente',
  component: EntregaClientesComponent
  },
  {
    path: 'cliente-calidad',
  component: ClientvisitCalidadComponent
  },
  {
    path: 'mercado-seguridad',
  component: MercadoSeguridadComponent
  },
  {
    path: 'servicio-cliente',
  component: ClienteServicioComponent
  },
  {
    path: 'rechazos',
  component: RechazosComponent
  },
  {
    path: 'poc',
  component: ProductividadPOCComponent
  },
  { path: '', redirectTo: 'avance-reporte', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
