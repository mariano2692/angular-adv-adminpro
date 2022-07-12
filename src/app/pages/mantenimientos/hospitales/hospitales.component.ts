import { Component, OnInit } from '@angular/core';
import { BusquedasService } from '../../../services/busquedas.service';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospitales.models';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales:Hospital[] = [];
  cargando:boolean = true
  imgSub!:Subscription

  constructor(
              private hospitalService: HospitalService,
              private modalImagenService:ModalImagenService,
              private busquedaService:BusquedasService) { }

  ngOnInit(): void {
    this.imgSub = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img=> this.cargarHospitales())
    this.cargarHospitales();
  }

  cargarHospitales(){
    this.cargando = true
    this.hospitalService.cargarHospitales()
      .subscribe(({hospitales})=>{
        this.hospitales = hospitales
        this.cargando = false
      })
  }

  guardarCambios(hospital:Hospital){

    this.hospitalService.actualizarHospital(hospital.uid,hospital.nombre)
      .subscribe(resp =>{
        Swal.fire('Actualizado', hospital.nombre,'success')
      })
  }
  eliminarHospital(hospital:Hospital){
    this.hospitalService.borrarHospital(hospital.uid)
      .subscribe(resp =>{
        this.cargarHospitales()
        Swal.fire('Eliminado', hospital.nombre,'success')
      })
  }
  async abrirSweetAlert(){
    const {value} = await Swal.fire({
      title:'Crear Hospital',
      text:'ingrese el nombre del hospital',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'ingrese un nombre'
    })
    if(!value) return
    this.hospitalService.crearHospital(value)
      .subscribe(resp=>{
        this.cargarHospitales();
      })
  }
  abrirModal(hospital:Hospital){
    this.modalImagenService.abrirModal('hospitales',hospital.uid, hospital.img)
  }

  buscar(termino:string){
    if(!termino.trim()) return
    this.busquedaService.busquedaUsuario('hospitales',termino)
      .subscribe(hospitales => this.hospitales = hospitales)
  }

}
