import { Component, OnInit } from '@angular/core';
import { JsonService } from './../../json.service';

@Component({
  selector: 'app-arrivaltrucks',
  templateUrl: './arrivaltrucks.component.html',
  styleUrls: ['./arrivaltrucks.component.css']
})
export class ArrivaltrucksComponent implements OnInit {
  preguntas:any [] = [];
  empresas:any [] = [];

  proveedores: any [] = [];

  dataEmpresa: any [] = [];
  bks: any[] = [];


  companyName: string = "";

  isChart: boolean = true;

  fechaInicio: string = '2021-05-01';
  fechaFin: string = '2021-08-31';


  constructor(
    public jsonService: JsonService
  ) { }

  ngOnInit(): void {
    this.getLlegadaCam();
    this.getCamionesRuta();
  }

  getLlegadaCam(){
    this.jsonService.getLlegadaCam().subscribe((resp: any) => {
      this.preguntas = resp.LLegadaCamionesMes.map((resp: any) => {
          return {
            abr: Number(resp.Abr),
            ago: Number(resp.Ago),
            dic: Number(resp.Dic),
            ene: Number(resp.Ene),
            feb: Number(resp.Feb),
            jul: Number(resp.Jul),
            jun: Number(resp.Jun),
            mar: Number(resp.Mar),
            may: Number(resp.May),
            nov: Number(resp.Nov),
            oct: Number(resp.Oct),
            sep: Number(resp.Sep),
            pregunta: resp.preguntas
          }
      })
    })
  }
  getCamionesRuta() {
    this.jsonService.getCamionesRuta(this.fechaInicio, this.fechaFin).subscribe((resp: any) => {
      this.proveedores = [...new Set(resp.LLegadaCamionesCumplimiento.map((e:any) => e.empresa))]
        this.bks = [...new Set(this.proveedores.map(b => b.bk))];
        this.empresas = resp.LLegadaCamionesCumplimiento.map((res: any) => {
          console.log()
          return {
            abr: Number(res.Abr),
            ago: Number(res.Ago),
            dic: Number(res.Dic),
            ene: Number(res.Ene),
            feb: Number(res.Feb),
            jul: Number(res.Jul),
            jun: Number(res.Jun),
            mar: Number(res.Mar),
            may: Number(res.May),
            nov: Number(res.Nov),
            oct: Number(res.Oct),
            sep: Number(res.Seb),
            empresa: res.empresa,
            bk: res.bk
          }
        });

        this.dataEmpresa = this.empresas;
        const temporal: any = []
        this.empresas.reduce(function(res, value) {
          if (!res[value.empresa]) {
            res[value.empresa] = { label: value.empresa, ene: 0, feb: 0, mar: 0, abr: 0, may: 0, jun: 0, jul: 0, ago: 0, sep: 0, oct: 0, nov: 0, dic: 0, };
            temporal.push(res[value.empresa])
          }
          res[value.empresa].ene += value.ene;
          res[value.empresa].feb += value.feb;
          res[value.empresa].mar += value.mar;
          res[value.empresa].abr += value.abr;
          res[value.empresa].may += value.may;
          res[value.empresa].jun += value.jun;
          res[value.empresa].jul += value.jul;
          res[value.empresa].ago += value.ago;
          res[value.empresa].sep += value.sep;
          res[value.empresa].oct += value.oct;
          res[value.empresa].nov += value.nov;
          res[value.empresa].dic += value.dic;
          return res;
        }, {});

      })
    }
    selectEmpresa($event: any) {
      console.log($event.target.value);
      if ($event.target.value === 'todos') {
        this.companyName = '';
        this.dataEmpresa = this.empresas;
      } else {
        this.companyName = $event.target.value;
        this.dataEmpresa = this.empresas.filter((dato, i) => {
          const { empresa } = dato;
          this.dataEmpresa = this.empresas;
          return empresa === $event.target.value;
        });
      }

    }

}
