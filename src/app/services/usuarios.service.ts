import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap, map, Observable, catchError, of, delay } from 'rxjs';
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

  get role():'ADMIN_ROLE'|'USER_ROLE'| undefined{
    return this.usuario.role
  }
  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  constructor(private http:HttpClient,
              private router:Router) { }

  
  
  guardarStorage(token:string, menu:any){
    localStorage.setItem('token',token)
    localStorage.setItem('menu',JSON.stringify(menu) )
  }

  logout(){
    localStorage.removeItem('menu')
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
        const {nombre,email,role,google,img='',uid} = resp.usuario
        this.usuario = new Usuario(nombre,email,role,google,img,uid)
      
        this.guardarStorage(resp.token,resp.menu)
        return resp.ok}),
      catchError(err => of(false))
    )
  }

  crearUsuario(formData:any){
    
    return this.http.post(`${base_url}/usuarios`, formData)
     .pipe(
      tap((resp:any)=>{
        this.guardarStorage(resp.token,resp.menu)

      })
    )
  }

  actualizarUsuario(data:{nombre:string , email:string, role:string}){

    data ={
      ...data,
      role:this.usuario.role || ''
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`,data,this.headers)
  }

  login(formData:any){
    return this.http.post(`${base_url}/login`,formData)
        .pipe(
          tap((resp:any)=>{
            this.guardarStorage(resp.token,resp.menu)

          })
        )

  }

  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token})
      .pipe(
        tap((resp:any)=>{
          this.guardarStorage(resp.token,resp.menu)

        })
      )
  }
  cagarUsuarios(desde:number = 0){
    return this.http.get<{total:number, usuarios:Usuario[]}>(`${base_url}/usuarios?desde=${desde}`,this.headers)
        .pipe(
          delay(2000),
          map(resp =>{
            const usuarios = resp.usuarios.map(
              user => new Usuario(user.nombre,user.email,user.role,user.google,user.img,user.uid)
              )
            return{total: resp.total, usuarios}
          })
        )
  }

  borrarUsuario(usuario: Usuario){
    return this.http.delete(`${base_url}/usuarios/${usuario.uid}`,this.headers)
  }

  guardarUsuario(usuario:Usuario){

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`,usuario,this.headers)
  }

}
