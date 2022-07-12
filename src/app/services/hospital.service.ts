import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../models/hospitales.models';
import { delay } from 'rxjs';
import Swal from 'sweetalert2';
const base_url = environment.baseUrl
@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  get token():string{
    return localStorage.getItem('token') || ''
  }
  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }


  constructor(private http: HttpClient) { }





  cargarHospitales(){
    return this.http.get<{hospitales:Hospital[]}>(`${base_url}/hospitales`,this.headers)
      .pipe(delay(1000))
  }

  crearHospital(nombre:string){
    return this.http.post(`${base_url}/hospitales`,{nombre},this.headers)

  }
  actualizarHospital(id:string,nombre:string){
    return this.http.put(`${base_url}/hospitales/${id}`,{nombre},this.headers)

  }
  borrarHospital(id:string){
    return this.http.delete(`${base_url}/hospitales/${id}`,this.headers)

  }


}


