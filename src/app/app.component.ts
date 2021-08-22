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
  providers: any[] = [];
  bks: any[] = [];
  databk: any[] = [];
  months: any[] = [];
  selectP: boolean = false;

  constructor(public jsonService: JsonService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.jsonService.getJson().subscribe(({ SalidaCamiones }) => {
      this.camiones = SalidaCamiones;
      console.log(this.camiones);
    });
  }

  /*groupByQuestions( data: any) {
    data.reduce( (res:any, value:any) => {
      console.log(value);
    });
  }*/

  selectProvider($event: any) {
    this.providers = this.camiones.filter((dato, i) => {
      const { empresa } = dato;
      return empresa === $event.target.value;
    });

    this.selectP = true;
    this.bks = this.providers.reduce( (a,b) => {
      const i = a.findIndex( (x:any) => x.bk === b.bk);
      return i === -1 ? a.push({ bk : b.bk, times : 1 }) : a[i].times++, a;
    }, []);

    this.months = this.providers.reduce( (a,b) => {
      const i = a.findIndex( (x:any) => x.mes === b.mes);
      return i === -1 ? a.push({ mes : b.mes, times : 1 }) : a[i].times++, a;
    }, []);
  }

  selectBk($event: any) {
    console.log($event.target.value);
    this.databk = this.providers.filter((dato, i) => {
      const { bk } = dato;
      return bk === $event.target.value;
    });
  }

  selectMonth($event: any) {
    console.log($event.target.value);
  }

}
