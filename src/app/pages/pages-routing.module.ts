import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path:'',
    component:PagesComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent,
        data:{titulo:'dashboard'}
      },
      {
        path:'grafica',
        component:Grafica1Component,
        data:{titulo:'gafica #1'}
      },
      {
        path:'progress',
        component:ProgressComponent,
        data:{titulo:'progress'}
      },
      {
        path:'account-settings',
        component:AccountSettingsComponent,
        data:{titulo:'accont settings'}
      },
      {
        path:'promesas',
        component:PromesasComponent,
        data:{titulo:'promesas'}
      },
      {
        path:'rxjs',
        component:RxjsComponent,
        data:{titulo:'rxjs'}
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
