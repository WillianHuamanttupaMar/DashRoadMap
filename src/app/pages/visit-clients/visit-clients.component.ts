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
  this.jsonService.getClientmes().subscribe((resp: any) => {
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




    })
  }




}
