import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.models';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public miform!:FormGroup;
  public usuario:Usuario
  public imagenSubir!:File

  constructor(private fb:FormBuilder,
              private usuarioService:UsuariosService,
              private fileUploadService:FileUploadService) 
              { 
                this.usuario = usuarioService.usuario
              }

  ngOnInit(): void {
    this.miform  = this.fb.group({
      nombre:[this.usuario.nombre,[Validators.required]],
      email:[this.usuario.email,[Validators.required]]
    })
  }

  actualizarPerfil(){
    this.usuarioService.actualizarUsuario(this.miform.value)
      .subscribe({
        next: () =>{
          const {nombre, email} =this.miform.value
          this.usuario.nombre = nombre
          this.usuario.email = email
  
          Swal.fire('Guardado','los cambios fueron guardados','success')
        },
        error: err => Swal.fire('Error', err.error.msg, 'error' )
      })
  }

  cambiarImagen(file:any){
    this.imagenSubir = file.target.files[0];
    console.log(this.imagenSubir)

  }
  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid || '')
      .then(resp =>{
        this.usuario.img = resp
        Swal.fire('Guardado','imagen actualizada','success')
      });
  }

}
