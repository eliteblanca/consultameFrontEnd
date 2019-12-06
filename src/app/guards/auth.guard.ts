import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StateService } from "../services/state.service";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router, private state:StateService){  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token') && (new JwtHelperService()).getTokenExpirationDate(localStorage.getItem('token')).getTime() > Date.now()) {

      window.setTimeout(() => {
        this.state.clearState()
        this.router.navigate(['/login'])

      },(new JwtHelperService()).getTokenExpirationDate(localStorage.getItem('token')).getTime() - Date.now() );

      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}