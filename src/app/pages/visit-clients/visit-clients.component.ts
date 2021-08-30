import { Component, OnInit } from '@angular/core';
import { JsonService } from './../../json.service';

@Component({
  selector: 'app-visit-clients',
  templateUrl: './visit-clients.component.html',
  styleUrls: ['./visit-clients.component.css']
})
export class VisitClientsComponent implements OnInit {

  id_preguntas:any [] = [];

  constructor(
    public jsonService: JsonService
  ) { }

  ngOnInit(): void {
    this.getClientmes();
  }

  getClientmes(){
    this.jsonService.getClientmes().subscribe((res: any) => {
      console.log(res);

    })
}
}
