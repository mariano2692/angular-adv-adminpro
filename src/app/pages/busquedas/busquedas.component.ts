import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuario.models';
import { Hospital } from '../../models/hospitales.models';
import { Medicos } from '../../models/medicos.models';
import { UsuariosComponent } from '../mantenimientos/usuarios/usuarios.component';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
    `
    .w70{
      width:70px
    }
    `
  ]
})
export class BusquedasComponent implements OnInit {

  public usuarios:Usuario[] =[];
  public hospitales:Hospital[]=[];
  public medicos:Medicos[]=[];


  constructor(private activatedRoute:ActivatedRoute,
              private busquedaService:BusquedasService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({termino}) =>{
      this.buscar(termino)
      })
  }

  buscar(termino:string){
    this.busquedaService.busquedaGlobal(termino)
    .subscribe((resp:any) =>{
      console.log(resp)
      this.usuarios = resp.usuario;
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos
      
    })
  }

  abrirMedico(medico:Medicos){
    console.log(medico)
  }

}
