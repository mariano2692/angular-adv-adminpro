import { Component, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';
import { Medicos } from '../../../models/medicos.models';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  medicos:Medicos[] = [];
  cargando:boolean = true
  imgSub!:Subscription

  constructor(private medicoService:MedicoService,
              private busquedaService:BusquedasService,
              private modalImagenService:ModalImagenService) { }

  ngOnInit(): void {
    this.imgSub = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.buscarMedicos())
    this.buscarMedicos()
  }

  buscarMedicos(){
    this.cargando = true
    this.medicoService.cargarMedicos()
      .subscribe(({medicos})=>{
        this.medicos = medicos
        this.cargando = false
      })
  }

  buscar(event:string){
    if(!event.trim()) return
    this.busquedaService.busquedaUsuario('medicos',event)
      .subscribe(medicos => {
        
        this.medicos = medicos
      })

  }
  abrirModal(medico:Medicos){
    this.modalImagenService.abrirModal('medicos',medico.uid,medico.img)

  }

  eliminarMedico(medico:Medicos){
    console.log(medico)
    this.medicoService.borrarMedico(medico.uid)
      .subscribe(resp =>{
        this.buscarMedicos();
        Swal.fire('Eliminado',medico.nombre,'success')
      })

  }

}
