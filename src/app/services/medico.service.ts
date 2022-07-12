import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Medicos } from '../models/medicos.models';
import { delay, map } from 'rxjs';

const base_url = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class MedicoService {


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

  constructor(private http:HttpClient) { }

  cargarMedicos(){
    return this.http.get<{ok:boolean,medicos:Medicos[]}>(`${base_url}/medicos`,this.headers)
      .pipe(delay(1000))
  }

  obtenerMedicoPorId(id:string){

    return this.http.get<{ok:boolean,medico:Medicos}>(`${base_url}/medicos/${id}`,this.headers)
      
  }
  crearMedico(medico:{nombre:string , hospital:string}){
    return this.http.post(`${base_url}/medicos`,medico,this.headers)

  }
  actualizarMedico(medico:Medicos){
    return this.http.put(`${base_url}/medicos/${medico.uid}`,medico,this.headers)

  }
  borrarMedico(id:string = ''){
    return this.http.delete(`${base_url}/medicos/${id}`,this.headers)
  }

}
