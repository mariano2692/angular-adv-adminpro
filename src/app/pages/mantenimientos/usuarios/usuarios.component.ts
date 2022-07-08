import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/usuario.models';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios:number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde:number = 0;
  public cargando:boolean = true;

  constructor(private usuariosService:UsuariosService,
              private buscarService:BusquedasService,
              private modalImagenService:ModalImagenService) { }

  ngOnInit(): void {
    
    this.modalImagenService.nuevaImagen.subscribe(img =>{
       this.cargarUsuarios()})
       this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando=true
    this.usuariosService.cagarUsuarios(this.desde).subscribe(({total,usuarios})=>{
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios
      this.cargando = false;
    })

  }

  cargarPagina(valor:number){
    this.desde += valor

    if(this.desde < 0) this.desde = 0
    if(this.desde >= this.totalUsuarios) this.desde -= valor

    this.cargarUsuarios()
  }

  buscar(termino:string){
    if(termino.length === 0) {return this.usuarios = this.usuariosTemp}

    return this.buscarService.busquedaUsuario('usuarios',termino)
      .subscribe(resp =>{
        this.usuarios = resp
      })


  }

  borrarUsuario(asd:Usuario){
    if(asd.uid === this.usuariosService.uid) return 
    Swal.fire({
      title: 'Estas seguro?',
      text: `esta a punto de borrar a ${asd.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.borrarUsuario(asd)
          .subscribe(resp => {
                                Swal.fire('Usuario borrado',
                                      `${asd.nombre} fue borrado`,
                                      'success')
                                this.cargarUsuarios()
                                    
          });
        }
    });
  }

  cambiarRole(usuario:Usuario){
    this.usuariosService.guardarUsuario(usuario)
      .subscribe()
  }

  abrirModal(usuario:Usuario){
    this.modalImagenService.abrirModal('usuarios',usuario.uid, usuario.img)
  }

  

}
