import { Component, OnInit } from '@angular/core';
import { JsonService } from './../../json.service';

@Component({
  selector: 'app-visit-clients',
  templateUrl: './visit-clients.component.html',
  styleUrls: ['./visit-clients.component.css']
})
export class VisitClientsComponent implements OnInit {

  preguntas:any [] = [];
  proveedores: any [] = [];
  empresas:any [] = [];
  bks: any[] = [];
  dataEmpresa: any [] = [];
  companyName: string = "";

  constructor(
    public jsonService: JsonService
  ) { }

  ngOnInit(): void {
    this.getClientmes();
    this.getClientRuta();
  }

  getClientmes(){
    this.jsonService.getClientmes().subscribe((res: any) => {
      console.log(res);
      this.preguntas = res.VisitaClientesMotivoMes.map((res: any) => {
        return{
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
            sep: Number(res.Sep),
            pregunta: res.preguntas
        }
      })

    })
  }
  getClientRuta() {
  this.jsonService.getClientRuta().subscribe((resp: any) => {
    console.log(resp)
    this.proveedores = [...new Set(resp.VistaClientesMotivoCalidadRUTA.map((e:any) => e.empresa))]
      this.bks = [...new Set(this.proveedores.map(b => b.bk))];

      this.empresas = resp.VistaClientesMotivoCalidadRUTA.map((res: any) => {
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
