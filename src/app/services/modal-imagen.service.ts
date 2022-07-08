import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';



const base_url = environment.baseUrl

@Injectable({
  providedIn: 'root'
})


export class ModalImagenService {
  private _ocultarModal:boolean = true;

  public tipo!: string
  public id!: string
  public img?: string

  public nuevaImagen:EventEmitter<string> = new EventEmitter()

  get ocultarModal(){
    return this._ocultarModal



  }
  constructor() { }

  abrirModal(tipo:'usuarios'|'medicos'|'hospirales', id:string = "", img:string = 'noimg'){
    this._ocultarModal = false
    this.tipo = tipo
    this.id = id

    this.img = `${base_url}/upload/${tipo}/${img}`
  }
  cerrarModal(){
    this._ocultarModal = true
  }
}
