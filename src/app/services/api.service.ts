import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { switchMap, tap, map } from "rxjs/operators";
import { Article } from "../article";

enum EndPoints {
  suggestions = "suggestions",
  articles = "articles",
  article = "articles/:id",
  login = "authenticate",
  userLines = "users/:id/lines",
  userSubLines = "users/:id/lines/:lineId",
  categories = "lines/:lineId/subLines/:SublineId/categories",
  likes = "articles/:id/likes"
}

type categories = {
  name:string,
  order:number,
  desplegado:boolean,
  subcategories?:categories
}[];

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient) {  }

  /**
  * Gets a list of common search
  * . If suggestion is defined get related searchs, If not return a list of 10 common searchs
  * @param suggestion string
  * @returns Observable<string[]>
  */
  getSuggestions(suggestion?:string):Observable<string[]>{
    return of(null).pipe(
      switchMap(val=>{
        if(suggestion){
          return this.http.get<string[]>(EndPoints.suggestions,{params:{input:suggestion},observe: "body"})
        }else{
          return this.http.get<string[]>(EndPoints.suggestions,{observe: "body"});
        }
      })
    )
  }

  /**
  * save a new search
  * @param suggestion string
  * @returns Observable<string[]>
  */
  postSuggestion(suggestion:string):Observable<string[]>{
    return of(null).pipe(
      switchMap(val=>this.http.post<string[]>(EndPoints.suggestions,suggestion,{observe: "body"}))
    )
  }

  /**
  * ### retorna una lista de articulos que se relacionan con la busqueda pasada como argumento
  * ***
  * @param input `string` 
  * 
  * Testo que se va a utilizar para realizar la busqueda
  * ***
  * @returns Observable<string[]>
  * 
  * Observable que retorna un array de articulos
  */
  getArticles(params:{query?:string,category?:string}):Observable<Article[]>{    
    return of(null).pipe(
      switchMap(val=>{
          return this.http.get<Article[]>(EndPoints.articles,{params:params,observe: "body"})
      })
    )
  }

  getArticle(articleId:string):Observable<Article>{
    return of(null).pipe(
      switchMap(val=>{
          return this.http.get<Article>(EndPoints.article.replace(':id',articleId),{observe: "body"})
      })
    )
  }

  postArticles(articles:Article[]):Observable<Article[]>{
    return of(null).pipe(
      switchMap(val=>this.http.post<Article[]>(EndPoints.articles,articles,{observe: "body"}))
    )
  }

  getCategories(lineId:string, sublineId:string):Observable<categories>{
    return of(null).pipe(
      switchMap(val=>{
          return this.http.get<categories>(EndPoints.categories.replace(':lineId',lineId).replace(':SublineId',sublineId),{observe: "body"})
      })
    )
  }

  login(user:string,pass:string):Observable<boolean>{
    console.log()
    return of(null).pipe(
      switchMap(val=>this.http.post<{tokem:string}>(EndPoints.login,{user:user, pass:pass},{observe: "body"})),
      tap(val=>{
        if(val.tokem){
          localStorage.setItem('token',val.tokem);
        }
      }),
      map(val=>{
        if(val.tokem){
          return true
        }else{
          return false
        }
      })
    )
  }

  getUserLines(userId):Observable<string[]>{
    return of(null).pipe(
      switchMap(val=>{
          return this.http.get<string[]>(EndPoints.userLines.replace(':id',userId),{observe: "body"})
      })
    )
  }

  getUserSubLines(userId:string,line:string):Observable<{name:string,sublines:string[]}>{
    return of(null).pipe(
      switchMap(val=>{
          return this.http.get<{name:string,sublines:string[]}>(EndPoints.userSubLines.replace(':id',userId).replace(':lineId',line),{observe: "body"})
      })
    )
  }

  postLike(userId,articleId){
    return of(null).pipe(
      switchMap(val=>this.http.post<string[]>(EndPoints.likes.replace(':id',articleId),{user:userId},{observe: "body"}))
    )
  }
}