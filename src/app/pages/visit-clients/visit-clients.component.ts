import { Component, OnInit } from '@angular/core';
import { JsonService } from './../../json.service';

@Component({
  selector: 'app-visit-clients',
  templateUrl: './visit-clients.component.html',
  styleUrls: ['./visit-clients.component.css']
})
export class VisitClientsComponent implements OnInit {

  preguntas:any [] = [];

  constructor(
    public jsonService: JsonService
  ) { }

  ngOnInit(): void {
    this.getClientmes();
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
}
