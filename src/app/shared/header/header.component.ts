import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public usuario!:Usuario
  constructor(private usuarioService:UsuariosService,
              private router:Router) { 
    this.usuario = usuarioService.usuario
   }

  logout(){
    this.usuarioService.logout()
  }

  ngOnInit(): void {
  }

  buscar(termino:string){
    this.router.navigate([`/pages/buscar/${termino}`])
  }

}
