import { MercadoSeguridadComponent } from './pages/mercado-seguridad/mercado-seguridad.component';
import { EntregaClientesComponent } from './pages/entrega-clientes/entrega-clientes.component';
import { AdvanceMonthComponent } from './pages/advance-month/advance-month.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'avance-reporte',
    component: AdvanceMonthComponent
  },
  {
    path: 'entrega-cliente',
  component: EntregaClientesComponent
  },
  {
    path: 'mercado-seguridad',
  component: MercadoSeguridadComponent
  },
  {
    path: 'dashboard',
  component: DashboardComponent
  },

  { path: '', redirectTo: 'avance-reporte', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

