import { JsonService } from './../../json.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-resporte-zone',
  templateUrl: './resporte-zone.component.html',
  styleUrls: ['./resporte-zone.component.css'],
})
export class ResporteZoneComponent implements OnInit {
  public barChartOptions: any = {
    scales: {
      xAxes: [{ stacked: true, barPercentage: 2 }],
      yAxes: [{ stacked: true }],
    },
    responsive: true,
    title: {
      display: true,
      text: 'SIC Cajas Rechazo Producto',
    },
    legend: {
      display: true,
      labels: {
        boxWidth: 20,
        padding: 10,
      },
    },
    tooltips: {
      mode: 'label',
      intersect: false,
    },
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  /// public barChartPlugins = [pluginDataLabels];

  chartData: any[] = [];

  public barChartData: ChartDataSets[] = [
    {
      type: 'line',
      label: 'Cajas Rechazo',
      data: [2000, 4000, 5000, 6000, 12000],
      backgroundColor: '#0000FF',
      borderColor: '#0000FF',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      lineTension: 0.3,
      pointBackgroundColor: '#0000FF',
      pointBorderColor: '#0000FF',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#0000FF',
      pointHoverBorderColor: '#0000FF',
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
    },
    {
      label: 'Rojo',
      type: 'bar',
      backgroundColor: 'rgb(255, 0, 0)',
      data: [2500, 5000, 7500, 10000, 12500],
    },
    {
      label: 'Amarillo',
      type: 'bar',
      backgroundColor: 'rgb(255, 255, 0)',
      data: [0, 0, 0, 0, 0],
    },
    {
      label: 'Verde',
      type: 'bar',
      backgroundColor: 'rgb(0, 128, 0)',
      data: [17500, 15000, 12500, 10000, 7500],
    },
  ];

  private subscription!: Subscription;

  constructor(private jsonService: JsonService) {}

  ngOnInit(): void {
    /* this.jsonService.getSorting().subscribe((res: any) => {
      console.log(res);
      this.barChartLabels = res.SalidaCamiones.map((res: any) => res.sic_hr);
      const data = res.SalidaCamiones.map((res: any) => Number(res.cajas));
      let obj:any = {};
      obj.data = data;
      obj.label = 'Cajas Rechazo';
      this.chartData.unshift(obj);
      this.barChartData = this.chartData;
    }) */
    this.subscription = interval(1000).subscribe((x) => {
      this.jsonService.getSorting().subscribe((res: any) => {
        console.log(res);
        this.chartData = [];
        this.barChartLabels = res.SalidaCamiones.map((res: any) => res.sic_hr);
        const data = res.SalidaCamiones.map((res: any) => Number(res.AcuCjas));
        let obj: any = {
          data: data,
          label: 'Cajas de Rechazo',
          backgroundColor: '#0000FF',
          borderColor: '#0000FF',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          lineTension: 0.3,
          pointBackgroundColor: '#0000FF',
          pointBorderColor: '#0000FF',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#0000FF',
          pointHoverBorderColor: '#0000FF',
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
        };
        this.chartData.unshift(obj);
        //this.barChartData = this.chartData;
      });
    });
  }
}
