import {  Injectable }             from '@angular/core';
import {  Router, Resolve,  RouterStateSnapshot,  ActivatedRouteSnapshot  } from '@angular/router';
import {  Observable, of, EMPTY }  from 'rxjs';
import { Article, articleConf } from "../article";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ArticlesResolverService implements Resolve<Article[]>{

  constructor(public api:ApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Article[]>{
    let query = route.url; 
    this.api.getArticles
  }
}