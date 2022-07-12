import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospitales.models';
import { MedicoService } from '../../../services/medico.service';
import { Medicos } from '../../../models/medicos.models';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  public hospitales:Hospital[] =[]
  public medicoForm!:FormGroup;

  public medicoSeleccionado!:Medicos
  public hospitalSeleccionado!:Hospital | undefined
  constructor(private fb:FormBuilder,
              private hospitalService:HospitalService,
              private medicoService:MedicoService,
              private router: Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  

    this.medicoForm = this.fb.group({
      nombre:['',[Validators.required]],
      hospital:['',[Validators.required]]
    })
    
    this.cargarHospitales()

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(hospitalId =>{
        this.hospitalSeleccionado = this.hospitales.find(h => h.uid === hospitalId)
        console.log(this.hospitalSeleccionado)
      })

      this.activatedRoute.params
      .subscribe(({id})=>{
        this.cargarMedico(id)})

      
  }

    cargarMedico(id:string){
    if(id === 'nuevo') return
    this.medicoService.obtenerMedicoPorId(id)
      .pipe(delay(100))
      .subscribe(({medico})=>{

    if(!medico) return this.router.navigate(['/pages/medicos'])
      const {nombre, hospital} = medico
      const id = hospital?._id
      this.medicoSeleccionado = medico;
      this.medicoForm.setValue({nombre,hospital:id})
      return
    })
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
      .subscribe(({hospitales})=>{
        this.hospitales = hospitales
      })
  }

  guardarMedico(){
    const { nombre } = this.medicoForm.value;
    console.log(this.medicoSeleccionado)

    if(this.medicoSeleccionado){
    const data = {...this.medicoForm.value,
          uid :this.medicoSeleccionado.uid
    }
    
      this.medicoService.actualizarMedico(data)
        .subscribe(resp=>{
          Swal.fire('actualizado',`${nombre} actualizado correctamente`,'success')
        })

    }else{
      const {nombre} = this.medicoForm.value
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((medico:any) =>{
          Swal.fire('Registro creado',`${nombre} creado correctamente`,'success')
          this.router.navigate([`/pages/medico/${medico.medico.uid}`])
        })
    }

   
    
  }

}
