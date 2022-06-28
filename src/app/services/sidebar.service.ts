import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuItem: any[] = [
    {
      titulo:'Dashboard',
      icono:'mdi mdi-gauge',
      submenu:[
        {titulo:'Main', url:'dashboard'},
        {titulo:'Progressbar', url:'progress'},
        {titulo:'Grafica', url:'grafica1'},
        
      ]
    }
  ]

  constructor() { }
}
