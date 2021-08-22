import { Component, OnInit } from '@angular/core';
import { JsonService } from './json.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'DashRoadMap';
  camiones: any[] = [];
  empresas: any[] = [];
  bks: any[] = [];
  databk: any[] = [];
  months: any[] = [];
  selectP: boolean = false;


  // Preguntas e indicadores
  preguntas: any[] = [];
  provideSelect: any[] = [];

  constructor(public jsonService: JsonService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.jsonService.getJson().subscribe(({ SalidaCamiones }) => {
      this.camiones = SalidaCamiones;
      this.preguntas = [...new Set(this.camiones.map(c => c.preguntas))];
      this.empresas = [...new Set(this.camiones.map(c => c.empresa))];
    });
  }

  /*groupByQuestions( data: any) {
    data.reduce( (res:any, value:any) => {
      console.log(value);
    });
  }*/

  selectProvider($event: any) {
    this.provideSelect = this.camiones.filter(({ empresa }, i) => empresa === $event.target.value);
    this.selectP = true;
    this.bks = [...new Set(this.provideSelect.map(b => b.bk))];
    this.months = [...new Set(this.provideSelect.map(b => b.mes))]
  }

  selectBk($event: any) {
    console.log($event.target.value);
    this.databk = this.provideSelect.filter((dato, i) => {
      const { bk } = dato;
      return bk === $event.target.value;
    });
  }

  selectMonth($event: any) {
    console.log($event.target.value);
  }

}
