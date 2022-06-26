import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: ()=>import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'pages',
    loadChildren: ()=>import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path:'**',
    component:NopagefoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
