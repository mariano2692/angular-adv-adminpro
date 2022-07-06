import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public usuario!:Usuario
  constructor(private usuarioService:UsuariosService) { 
    this.usuario = usuarioService.usuario
   }

  logout(){
    this.usuarioService.logout()
  }

  ngOnInit(): void {
  }

}
