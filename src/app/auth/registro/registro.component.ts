import { Component } from '@angular/core';
import {FormBuilder,Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { ValidatorService } from '../validators/validator.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls:['./registro.component.css']
})
export class RegistroComponent {

    public formSubmitted = false

    public registerForm = this.fb.group({
    nombre:['mariano',[Validators.required]],
    email:['mariano@test.com',[Validators.required]],
    password:['123456',[Validators.required, Validators.minLength(6)]],
    password2:['123456',[Validators.required,Validators.minLength(6)]],
    terminos:[false,[Validators.requiredTrue]]

  },{
    validators: this.vS.camposIguales('password','password2')
  })
  constructor(private fb:FormBuilder,
              private vS:ValidatorService,
              private usuarioService: UsuariosService,
              private router:Router) { }

  crearUsuario(){
    this.formSubmitted = true
    if(this.registerForm.invalid) return

    this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe({
          next:resp=>  this.router.navigate(['/pages/dashboard']),
          error: err => Swal.fire('Error!',err.error.msg,'error')
        })
  }
  campoNoValido(campo:string):boolean{
    if(this.registerForm.get(campo)?.invalid && this.formSubmitted) return true
    return false
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  passNoValidas(){
    const pass1 = this.registerForm.get('password')?.value
    const pass2 = this.registerForm.get('password2')?.value

    if((pass1 !== pass2 )&& this.formSubmitted) return true
    return false
  }


}
