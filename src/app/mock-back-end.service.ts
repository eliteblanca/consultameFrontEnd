//#region imports 
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LocalStorage } from "./local-storage";
////#endregion imports
@Injectable({
  providedIn: 'root'
})
class MockBackEndService implements HttpInterceptor{

  BBDD:LocalStorage;
  //let articulos: Tarticles = JSON.parse(localStorage.getItem('articulos')) || [];


  /**
  * Conecta cada url con su respectivo metodo en la base de datos  
  * @param req HttpRequest<string>
  * @returns Observable<HttpEvent<string[]>>
  */
  enrutar(req:HttpRequest<string>):Observable<HttpEvent<any>>{
    let {url,method,body,params} = req;
    if(url.match('^suggestions$') && method == 'POST'){
      this.BBDD.postSuggestion(body);      
      
      return of(new HttpResponse({
        status: 200,
        body: this.BBDD.getSuggestions(10)
      }))
    }

    if(url.match('^suggestions$') && method == 'GET'){
      if(params.has('input')){
        return of(new HttpResponse({
          status: 200,
          body: this.BBDD.getSuggestions(params.get('input'))
        }))
      }else{
        return of(new HttpResponse({
          status: 200,
          body: this.BBDD.getSuggestions(10)
        }))
      }
    }

    if(url.match('^articles$') && method == 'GET'){
      return of(new HttpResponse({
        status: 200,
        body: this.BBDD.getArticles(params.get('input'))
      }))
    }

  }

  intercept(req: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.enrutar(req);
  };

  constructor() {
    this.BBDD = new LocalStorage();
  } 
}


export const mockServerService = { provide: HTTP_INTERCEPTORS, useClass: MockBackEndService, multi: true }