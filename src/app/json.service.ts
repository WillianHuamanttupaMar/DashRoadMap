import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";

const url = environment.base_url;

@Injectable({
  providedIn: 'root'

})
export class JsonService {

  usuarioestado: string = "";
  usuarioempresa: string = "";
  usuariopuesto: string = "";
  usuarioapellidos: string = "";
  usuarionombre: string = "";
  usuariotipo: string = "";
  usuariocentro: string = "";
  usuarioid: string = "";

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ){
    this.usuarioestado = this.cookieService.get('usuarioestado');
    this.usuarioempresa = this.cookieService.get('usuarioempresa');
    this.usuariopuesto = this.cookieService.get('usuariopuesto');
    this.usuarioapellidos = this.cookieService.get('usuarioapellidos');
    this.usuarionombre = this.cookieService.get('usuarionombre');
    this.usuariotipo = this.cookieService.get('usuariotipo');
    this.usuariocentro = this.cookieService.get('usuariocentro') || 'BK77';
    this.usuarioid = this.cookieService.get('usuarioid');
   }

  getJson(){
    let params = new HttpParams();
    // params = params.append('centro', this.usuariocentro);
    // params = params.append('fechaIni', '2021-01-01');
    // params = params.append('fechaFin', '2021-12-31');
    return this.http.get(`${url}/owdT2/VisitaClientesMotivoCalidadMes.php?centro=BK77&fechaIni=2021-01-01&fechaFin=2021-12-31`);
  }

  getData() {
    return this.http.get(`${url}/owdT2/salidadeCamionesRuta.php`);
  }

  getSorting() {
    let params = new HttpParams();
    params = params.append('fecha', '2021-08-28');
    return this.http.get(`${url}/dashboard/sorting`, {params})
  }


  getClientmes(){
    let params = new HttpParams();
    params = params.append('centro', this.usuariocentro);
    params = params.append('fechaIni', '2021-01-01');
    params = params.append('fechaFin', '2021-12-31');
    return this.http.get(`${url}/owdT2/VisitaClientesMotivoCalidadMes.php`,{params});
  }

  getClientRuta() {
    return this.http.get(`${url}/owdT2/VisitaClientesMotivoCalidadRuta.php`);
  }

  getLlegadaCam(){
    let params = new HttpParams();
    params = params.append('centro', this.usuariocentro);
    params = params.append('fechaIni', '2021-05-01');
    params = params.append('fechaFin', '2021-08-31');
    console.log(`${url}/owdT2/salidadeCamionesMes.php`);
    return this.http.get(`${url}/owdT2/llegadadeCamionesMes.php`,{params});

  }

  getCamionesRuta( fechaini: string, fechafin: string) {
    let params = new HttpParams();
    params = params.append('centro', this.usuariocentro);
    params = params.append('fechaIni', fechaini);
    params = params.append('fechaFin', fechafin);
    return this.http.get(`${url}/owdT2/llegadadeCamionesRuta.php`, { params });
}

}
