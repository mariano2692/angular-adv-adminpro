import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.models';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';




const base_url = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {
  

  public usuario!:Usuario

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  get token():string{
    return localStorage.getItem('token') || ''
  }
  get uid():string{
    return this.usuario.uid || ''
  }

  constructor(private http:HttpClient) { }


  busquedaGlobal(termino:string){
    return this.http.get(`${base_url}/todo/${termino}`,this.headers)
  }

 private generarUsuarios(resultados: any[]): Usuario[]{
  return resultados.map(
    user => new Usuario(user.nombre,user.email,user.role,user.google,user.img,user.uid)
  )
 }

  busquedaUsuario(tipo:'usuarios' | 'medicos' | 'hospitales',termino:string){
    return this.http.get(`${base_url}/todo/coleccion/${tipo}/${termino}`,this.headers)
    .pipe(
      map((resp:any) => {
        switch (tipo) {
          case 'usuarios':
            return this.generarUsuarios(resp.resultados)
            
          case 'hospitales':
            return resp.resultados

          case 'medicos':
            return resp.resultados
        
          default:
            return []
        }
      })
    )
  }



}

