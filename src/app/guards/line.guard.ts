import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineGuard implements CanActivate {

  constructor(private router: Router, private route: ActivatedRoute,){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // https://stackoverflow.com/questions/43698032/angular-how-to-update-queryparams-without-changing-route      
      if(next.queryParamMap.has('line')){
        return true;
      }else{        
        return false;
      }
  }  
}
