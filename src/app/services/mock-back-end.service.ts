import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LocalStorage } from "../local-storage";

type categories = {
  name:string,
  order:number,
  desplegado:boolean,
  subcategories?:categories
}[];

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
  enrutar(req:HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    let {url,method,body,params} = req;   

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
    
    if(url.match('^api/articles$') && method == 'GET'){

      return next.handle(req);

      // if(params.has('query')){
      //   return of(new HttpResponse({
      //     status: 200,
      //     body: this.BBDD.getArticles(params.get('query'))
      //   }))
      // }else if(params.has('category')){
      //     return of(new HttpResponse({
      //       status: 200,
      //       body: this.BBDD.getArticles(params.get('category'))
      //     }))
      // }
    }

    if(url.match('^articles$') && method == 'POST'){
      console.log(body);
      return of(new HttpResponse({
        status: 200,
        body: this.BBDD.postArticles(body)
      }))
    }

    if(url.startsWith('api/articles/') && method == 'GET'){

      return next.handle(req);

      // return of(new HttpResponse({
      //   status: 200,
      //   body: this.BBDD.getArticle(url.split('/')[1])
      // }))

    }

    if(url.match('^api/authenticate$') && method == 'POST'){
      return next.handle(req);

      // if(body.user == 'julian' && body.pass == '123'){
      //   return of(new HttpResponse({
      //     status: 200,
      //     body: {tokem:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp1bGlhbiIsInJvbCI6ImFkbWluIiwibGluZSI6ImFsbCIsInN1YkxpbmUiOiIifQ.SkMKVjzCyzHQTvHq7MvEf_VCBldjhdHnLm6-1WBiodk"}
      //   }))
      // }
    }

    if(url.match("^users/.*/lines$") && method == 'GET'){
      return of(new HttpResponse({
        status: 200,
        body: ["Bancolombia", "Sura", "DirecTV"]
      }))
    }

    if(url.match("^users/.*/lines/.*$") && method == 'GET'){
      let subLines = [];      

      switch (url.split('/')[3]) {
        case 'Bancolombia':
          subLines = ["Atencion al cliente", "Ventas", "Soporte"]
          break;      
        case 'Sura':
          subLines = ["Citas", "Urgencias"]
          break;      
        case 'DirecTV':
          subLines = ["Soporte", "SAC"]
          break;      
        default:          
            subLines = ["Atencion al cliente", "Ventas", "Soporte"]
          break;
      }

      return of(new HttpResponse({
        status: 200,
        body: {name:url.split('/')[3], sublines:subLines}
      }))
    }

    if(url.match("^lines/.*/subLines/.*/categories$") && method == 'GET'){

      let intPrueba = (Math.random() * 100).toPrecision(1)

      let categories:categories = [
        {
          name:`categoria ${intPrueba}`,
          order:1,
          desplegado:true,
          subcategories:[{
              name:"sub Categoria 1",
              order:1,
              desplegado:true
            },{
              name:"sub Categoria 2",
              order:1,
              desplegado:true
            }
          ]
        },{
          name:"categoria 2",
          order:1,
          desplegado:true,
          subcategories:[{
              name:"sub Categoria 1",
              order:1,
              desplegado:true
            },{
              name:"sub Categoria 2",
              order:1,
              desplegado:true
            }
          ]
        },{
          name:"categoria 3",
          order:1,
          desplegado:true,
          subcategories:[{
              name:"sub Categoria 1",
              order:1,
              desplegado:true,
              subcategories:[{
                name:"sub Categoria 1",
                order:1,
                desplegado:true,
                subcategories:[{
                  name:"sub Categoria 1",
                  order:1,
                  desplegado:true
                },{
                  name:"sub Categoria 2",
                  order:1,
                  desplegado:true
                }
              ]
              },{
                name:"sub Categoria 2",
                order:1,
                desplegado:true
              }
            ]
            },{
              name:"sub Categoria 2",
              order:1,
              desplegado:true
            }
          ]
        },
      ];

      return of(new HttpResponse({
        status: 200,
        body: categories
      }))
    }

    if(url.match('^articles/.*/likes$') && method == 'POST'){
      let articleId = url.split('/')[1];

      return of(new HttpResponse({
        status: 200,
        body: this.BBDD.postLike(articleId, body['user'])
      }))
      
    }

    if(url.match('^articles/.*/disLikes$') && method == 'POST'){
      let articleId = url.split('/')[1];

      return of(new HttpResponse({
        status: 200,
        body: this.BBDD.postDisLike(articleId, body['user'])
      }))
      
    }

    if(url.match('^articles/.*/likes$') && method == 'DELETE'){      
      let articleId = url.split('/')[1];
      let userId = params.get('user');
      return of(new HttpResponse({
        status: 200,
        body: this.BBDD.deleteLike(articleId, userId)
      }))
      
    }

    if(url.match('^articles/.*/disLikes$') && method == 'DELETE'){
      let articleId = url.split('/')[1];
      let userId = params.get('user');
      return of(new HttpResponse({
        status: 200,
        body: this.BBDD.deleteDisLike(articleId, userId)
      }))
    }
  }

  intercept(req: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.enrutar(req, next);
  };

  constructor() {
    this.BBDD = new LocalStorage();
  }
}

export const mockServerService = { provide: HTTP_INTERCEPTORS, useClass: MockBackEndService, multi: true }