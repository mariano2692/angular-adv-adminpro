import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInit():any

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
 
  constructor(private settingService:SettingsService,
              private sidebarService:SidebarService) { }

  ngOnInit(): void {
    console.log(this.sidebarService.menuItem)
   this.sidebarService.cargarMenu();
    customInit();
    
  }

}
