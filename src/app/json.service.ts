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
    console.log('hola mundo ',this.usuariocentro);
    let params = new HttpParams();
    params = params.append('centro', this.usuariocentro);
    params = params.append('fechaIni', '2021-05-01');
    params = params.append('fechaFin', '2021-08-31');
    params = params.append('empresaT2', 'DICORJES 20E.I.R.L.');
    params = params.append('rutaT2', 'BK7703');
    console.log(`${url}/owdT2/salidadeCamionesMes.php`);

    return this.http.get(`${url}/owdT2/salidadeCamionesMes.php`, {params});
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
    params = params.append('fechaIni  ', '2021-01-01');
    params = params.append('fechaFin', '2021-12-31');
    return this.http.get(`${url}/owdT2/VisitaClientesMotivoCalidadMes.php`,{params});
  }
}


