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
    params = params.append('centro', this.usuariocentro);
    params = params.append('fechaIni', '2021-05-01');
    params = params.append('fechaFin', '2021-08-31');
    console.log(`${url}/owdT2/salidadeCamionesMes.php`);
    return this.http.get(`${url}/owdT2/salidadeCamionesMes.php`,{params});
   }

  getData( fechaini: string, fechafin: string) {
    let params = new HttpParams();
    params = params.append('centro', this.usuariocentro);
    params = params.append('fechaIni', fechaini);
    params = params.append('fechaFin', fechafin);
    return this.http.get(`${url}/owdT2/salidadeCamionesRuta.php`, { params });
  }

  getSorting() {
    let params = new HttpParams();
    params = params.append('fecha', '2021-08-28');
    return this.http.get(`${url}/dashboard/sorting`, {params})
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

getEntregaClientMes(){
  let params = new HttpParams();
  params = params.append('centro', this.usuariocentro);
  params = params.append('fechaIni', '2021-05-01');
  params = params.append('fechaFin', '2021-08-31');
  console.log(`${url}/owdT2/ProcesodeentregaclientesMes.php`);
  return this.http.get(`${url}/owdT2/ProcesodeentregaclientesMes.php`,{params});

}

getEntregaClientRuta( fechaini: string, fechafin: string) {
  let params = new HttpParams();
  params = params.append('centro', this.usuariocentro);
  params = params.append('fechaIni', fechaini);
  params = params.append('fechaFin', fechafin);
  return this.http.get(`${url}/owdT2/ProcesodeentregaclientesRuta.php`, { params });
}

getClientCalidadMes(){
  let params = new HttpParams();
  params = params.append('centro', this.usuariocentro);
  params = params.append('fechaIni', '2021-01-01');
  params = params.append('fechaFin', '2021-12-31');
  console.log(`${url}/owdT2/VisitaClientesMotivoCalidadMes.php`);
  return this.http.get(`${url}/owdT2/VisitaClientesMotivoCalidadMes.php`,{params});

}

getClientCalidadRuta( fechaini: string, fechafin: string) {
  let params = new HttpParams();
  params = params.append('centro', this.usuariocentro);
  params = params.append('fechaIni', fechaini);
  params = params.append('fechaFin', fechafin);
  return this.http.get(`${url}/owdT2/VisitaClientesMotivoCalidadRuta.php`, { params });
}
getmercadoSeguridadMes(){
  let params = new HttpParams();
  params = params.append('centro', this.usuariocentro);
  params = params.append('fechaIni', '2021-01-01');
  params = params.append('fechaFin', '2021-12-31');
  console.log(`${url}/owdT2/VisitamercadoporseguridadMes.php`);
  return this.http.get(`${url}/owdT2/VisitamercadoporseguridadMes.php`,{params});

}

getmercadoSeguridadRuta( fechaini: string, fechafin: string) {
  let params = new HttpParams();
  params = params.append('centro', this.usuariocentro);
  params = params.append('fechaIni', fechaini);
  params = params.append('fechaFin', fechafin);
  return this.http.get(`${url}/owdT2/VisitamercadoporseguridadRuta.php`, { params });
}
getclienteServicioMes(){
  let params = new HttpParams();
  params = params.append('centro', this.usuariocentro);
  params = params.append('fechaIni', '2021-01-01');
  params = params.append('fechaFin', '2021-12-31');
  return this.http.get(`${url}/owdT2/VisitaclientesServicioMes.php`,{params});

}

getclienteServicioRuta( fechaini: string, fechafin: string) {
  let params = new HttpParams();
  params = params.append('centro', this.usuariocentro);
  params = params.append('fechaIni', fechaini);
  params = params.append('fechaFin', fechafin);
  return this.http.get(`${url}/owdT2/VisitaclientesServicioRuta.php`, { params });
}
getrechazosMes(){
  let params = new HttpParams();
  params = params.append('centro', this.usuariocentro);
  params = params.append('fechaIni', '2021-01-01');
  params = params.append('fechaFin', '2021-12-31');
  return this.http.get(`${url}/owdT2/RechazosMes.php`,{params});

}

getrechazosRuta( fechaini: string, fechafin: string) {
  let params = new HttpParams();
  params = params.append('centro', this.usuariocentro);
  params = params.append('fechaIni', fechaini);
  params = params.append('fechaFin', fechafin);
  return this.http.get(`${url}/owdT2/RechazosRuta.php`, { params });
}
getproducpocMes(){
  let params = new HttpParams();
  params = params.append('centro', this.usuariocentro);
  params = params.append('fechaIni', '2021-01-01');
  params = params.append('fechaFin', '2021-12-31');
  return this.http.get(`${url}/owdT2/ProductividadenelPOCMes.php`,{params});

}

getproducpocRuta( fechaini: string, fechafin: string) {
  let params = new HttpParams();
  params = params.append('centro', this.usuariocentro);
  params = params.append('fechaIni', fechaini);
  params = params.append('fechaFin', fechafin);
  return this.http.get(`${url}/owdT2/ProductividadenelPOCRuta.php`, { params });
}
}
