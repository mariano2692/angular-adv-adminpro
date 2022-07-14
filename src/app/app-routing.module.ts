import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: ()=>import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'pages',
    canActivate:[AuthGuard],
    canLoad:[AuthGuard],
    loadChildren: ()=>import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path:'**',
    redirectTo:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
