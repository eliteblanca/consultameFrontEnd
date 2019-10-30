import {  Injectable }             from '@angular/core';
import {  Router, Resolve,  RouterStateSnapshot,  ActivatedRouteSnapshot  } from '@angular/router';
import {  Observable, of, EMPTY }  from 'rxjs';
import { Article, articleConf } from "../article";

@Injectable({
  providedIn: 'root'
})
export class ArticlesResolverService /*implements Resolve<Article[]>*/{

  constructor() { }

  /* resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Article[]>{
    let query = route.url; 
    this.api.getArticles
  } */
}