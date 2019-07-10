import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { switchMap, tap, map } from "rxjs/operators";
import { Article, articleConf } from "../article";
import { JwtHelperService } from '@auth0/angular-jwt';
 
type user = {
  sub:string,
  name:string,
  rol:string,
  line:string,
  subLine:string
}

const helper = new JwtHelperService();

enum EndPoints {
  suggestions = "suggestions",
  articles = "articles",
  article = "articles/:id",
  login = "authenticate",
  userLines = "users/:id/lines"
}

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

  getCurrentUser():user{
    return helper.decodeToken(localStorage.getItem("token"));
    //const expirationDate = helper.getTokenExpirationDate(myRawToken);
    //const isExpired = helper.isTokenExpired(myRawToken);
  }

  getUserLines(userId):Observable<string[]>{
    return of(null).pipe(
      switchMap(val=>{
          return this.http.get<string[]>(EndPoints.userLines.replace(':id',userId),{observe: "body"})
      })
    )
  }
}