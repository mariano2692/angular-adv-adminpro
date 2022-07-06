import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap, map, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.models';



const base_url = environment.baseUrl

declare const google:any

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuario!:Usuario

  get token():string{
    return localStorage.getItem('token') || ''
  }
  get uid():string{
    return this.usuario.uid || ''
  }

  constructor(private http:HttpClient,
              private router:Router) { }

  logout(){
    localStorage.removeItem('token')

    google.accounts.id.revoke('marianoalbertomenendez@gmail.com',()=>{
      this.router.navigate(['/auth/login'])
    })
    
  }

  validarToken():Observable<boolean>{
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    })
    .pipe(
      map((resp:any) => {
        const {email,google,nombre,role,img='',uid} = resp.usuario
        this.usuario = new Usuario(nombre,email,google,role,img,uid)
        localStorage.setItem('token',resp.token)
        return resp.ok}),
      catchError(err => of(false))
    )
  }

  crearUsuario(formData:any){
    console.log('creando usuario')
    return this.http.post(`${base_url}/usuarios`, formData)
     .pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token)
      })
    )
  }

  actualizarUsuario(data:{nombre:string , email:string, role:string}){
    data ={
      ...data,
      role: this.usuario.role!
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`,data,{
      headers:{
        'x-token':this.token
      }
    })
  }

  login(formData:any){
    return this.http.post(`${base_url}/login`,formData)
        .pipe(
          tap((resp:any)=>{
            localStorage.setItem('token',resp.token)
          })
        )

  }

  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token})
      .pipe(
        tap((resp:any)=>{
          localStorage.setItem('token',resp.token)
        })
      )
  }
}
