import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
     public menuItem:any = [];
     cargarMenu(){
        this.menuItem  = JSON.parse(localStorage.getItem('menu')|| '') || []
     }
  // menuItem: any[] = [
  //   {
  //     titulo:'Dashboard',
  //     icono:'mdi mdi-gauge',
  //     submenu:[
  //       {titulo:'Main', url:'dashboard'},
  //       {titulo:'Progressbar', url:'progress'},
  //       {titulo:'Grafica', url:'grafica'},
  //       {titulo:'Promesas',url:'promesas'},
  //       {titulo:'RxJs',url:'rxjs'}
        
  //     ]
  //   },

  //   {
  //     titulo:'Mantenimiento',
  //     icono:'mdi mdi-folder-lock-open',
  //     submenu:[
  //       {titulo:'Usuarios',url:'usuarios'},
  //       {titulo:'Medicos',url:'medicos'},
  //       {titulo:'Hospitales',url:'hospitales'},
  
        
  //     ]
  //   }
  // ]

  constructor() { }
}
