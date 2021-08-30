import { ResporteZoneComponent } from './pages/resporte-zone/resporte-zone.component';
import { AdvanceMonthComponent } from './pages/advance-month/advance-month.component';
import { VisitClientsComponent } from './pages/visit-clients/visit-clients.component';
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
    path: 'cliente-reporte',
  component: VisitClientsComponent
  },
  {
    path: 'llegada-reporte',
  component: ArrivaltrucksComponent
  },
  { path: '', redirectTo: 'avance-reporte', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
