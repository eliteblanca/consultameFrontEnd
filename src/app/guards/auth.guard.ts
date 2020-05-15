import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StateService } from "../services/state.service";
import { AutenticateApiService } from "../api/autenticate-api.service";
import { map, tap, catchError } from 'rxjs/operators';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router:Router,
    private state:StateService,    
    private autenticateApi: AutenticateApiService
  ){  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.autenticateApi.refreshToken().pipe(
      catchError(err => of(false)),
      map(val => {

        if(typeof val == 'boolean'){
          this.router.navigate(['/login']);
          return val
        } else {
          let decoded = helper.decodeToken(val.token)
          this.state.setToken(val.token, decoded)
          this.state.setUser({ name: decoded.name, rol: decoded.rol, sub:decoded.sub })

          this.autenticateApi.startSilentRefresh(decoded)

          return true

        }

      })
    )
  }
}