import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
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
  meses: any[] = [];


  pruebatempora: any[] = [];


  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];

  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  constructor(public jsonService: JsonService) { }

  ngOnInit() {
    this.getData();
  }


  groupBy(objectArray: any, property: any) {
    return objectArray.reduce((acc: any, obj: any) => {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  groupByPercente(array: any) {
    const resMonth = array.reduce((a: any, data: any) => {
      a[data.preguntas] = a[data.preguntas] || { pregunta: data.preguntas, valor: 0, contador: 0, porcentaje: 0, mes: data.mes }
      a[data.preguntas].valor += data.respuesta_valor
      a[data.preguntas].contador += data.contador
      a[data.preguntas].porcentaje = (a[data.preguntas].valor * 100) / a[data.preguntas].contador;
      return a;
    }, []);

    const resultados: any = [];
    for (const key in resMonth) {
      resultados.push(resMonth[key])
    }


    resultados.sort(function (a: any, b: any) {
      return a[0] - b[0];
    });


    return resultados;
  }

  groupByTwo(array: any, key: any) {
    return Array.from(array
      .reduce((m: any, o: any) => m.set(o[key], [...(m.get(o[key]) || []), o]), new Map)
      .values()
    );
  }

  getData() {
    this.jsonService.getJson().subscribe(({ SalidaCamiones }) => {
      this.camiones = SalidaCamiones;
      this.preguntas = [...new Set(this.camiones.map(c => c.preguntas))];
      this.empresas = [...new Set(this.camiones.map(c => c.empresa))];

      this.camiones = SalidaCamiones.map((temp: any) => ({ ...temp, contador: Number(temp.contador), respuesta_valor: Number(temp.respuesta_valor) }));

      console.log(this.camiones);

      const groupQuestions = this.groupBy(this.camiones, 'mes');

      const abril = groupQuestions['04']
      const mayo = groupQuestions['05']
      const junio = groupQuestions['06'];
      const julio = groupQuestions['07'];
      const agosto = groupQuestions['08'];

      const abrilResultados = this.groupByPercente(abril);
      const mayoResultados = this.groupByPercente(mayo);
      const junioResultados = this.groupByPercente(junio);
      const julioResultados = this.groupByPercente(julio);
      const agostoResultados = this.groupByPercente(agosto);



      const todos = [
        ...abrilResultados,
        ...mayoResultados,
        ...junioResultados,
        ...julioResultados,
        ...agostoResultados
      ];


      const temporal = this.groupBy(todos, 'pregunta');

      for (const pregunta in temporal) {

        const data = [];
        for (const key in temporal[pregunta]) {
          data.push({ mes: temporal[pregunta][key].mes, valor: temporal[pregunta][key].valor, porcentaje: Math.round(temporal[pregunta][key].porcentaje * 100) / 100, contador: temporal[pregunta][key].contador })
        }
        data.unshift(
          { mes: '01', valor: 0, porcentaje: 0, contador: 0},
          { mes: '02', valor: 0, porcentaje: 0, contador: 0},
          { mes: '03', valor: 0, porcentaje: 0, contador: 0},
        );
        // console.log(mes)
        this.pruebatempora.push({ pregunta, data })
      }
      console.log(this.pruebatempora);
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






  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  //public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: any;




  private generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor(): void {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel(): void {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
  }

}
