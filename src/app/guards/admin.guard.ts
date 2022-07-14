import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,RouterStateSnapshot, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usuarioService:UsuariosService,
              private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log('adminguard')

      if(this.usuarioService.role === 'ADMIN_ROLE'){
        return true }
      else{
        this.router.navigate(['pages/dashboard'])
        return false
      }
  }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
}
