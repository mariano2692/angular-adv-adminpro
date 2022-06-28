import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent{
  @Input() progreso : number = 0;
  @Input() btnClass:string = 'btn btn-primary'


  @Output() onValor: EventEmitter<number> = new EventEmitter()

  cambiarValor(valor: number){

    if(this.progreso>= 100 && valor>0){
       this.onValor.emit(100)
       return this.progreso = 100}
    if(this.progreso<=0 && valor<0) {
      this.onValor.emit(0)
      return this.progreso = 0
}
    this.progreso = this.progreso + valor;
    this.onValor.emit(this.progreso)
    return this.progreso

  }

  onChange(event:number){

    if(event >= 100) this.progreso = 100
    if(event <=0) this.progreso = 0
    
   this.onValor.emit(event)
  }

}
