import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

const url = environment.base_url;

@Injectable({
  providedIn: 'root'

})
export class JsonService {

  constructor(private http: HttpClient){ }

  getJson(){
    return this.http.get<any>(`${url}/cuestionario.php`);
  }

}


