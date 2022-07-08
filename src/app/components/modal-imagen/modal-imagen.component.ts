import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {
  public usuario:Usuario
  public imagenSubir!:File
  public tipo!: string

  constructor(public modalImagenService:ModalImagenService,
              private fileUploadService:FileUploadService,
              private usuarioService:UsuariosService) { 
                this.usuario = usuarioService.usuario
                
              }

  ngOnInit(): void {
    console.log(this.usuario)
    
  }

  cerrarModal(){
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(file:any){
    this.imagenSubir = file.target.files[0];

  }
  subirImagen(){
 
    this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid || '')
      .then(resp =>{
        this.usuario.img = resp
        this.modalImagenService.nuevaImagen.emit(resp)
        this.cerrarModal()
        Swal.fire('Guardado','imagen actualizada','success')
      });
  }

}
