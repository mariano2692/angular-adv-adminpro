import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!:File
  public tipo!: string
  public id!:string

  constructor(public modalImagenService:ModalImagenService,
              private fileUploadService:FileUploadService,
              ) { 
            
                
              }

  ngOnInit(): void {
    
  }

  cerrarModal(){
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(file:any){
    this.imagenSubir = file.target.files[0];

  }
  subirImagen(){

    const tipo = this.modalImagenService.tipo
    const id= this.modalImagenService.id
    
 
    this.fileUploadService.actualizarFoto(this.imagenSubir,tipo,id|| '')
      .then(resp =>{
        this.modalImagenService.nuevaImagen.emit(resp)
        this.cerrarModal()
        Swal.fire('Guardado','imagen actualizada','success')
      });
  }

}
