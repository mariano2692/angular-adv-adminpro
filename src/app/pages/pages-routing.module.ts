import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path:'',
    component:PagesComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'grafica',
        component:Grafica1Component
      },
      {
        path:'progress',
        component:ProgressComponent
      },
      {
        path:'**',
        redirectTo:'dashboard'
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
