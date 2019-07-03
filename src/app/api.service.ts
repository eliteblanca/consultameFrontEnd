import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { switchMap } from "rxjs/operators";
import { Article, articleConf } from "./article";
enum EndPoints {
  suggestions = "suggestions",
  articles = "articles"
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

  getArticles(input:string):Observable<Article[]>{
    return of(null).pipe(
      switchMap(val=>{
          return this.http.get<Article[]>(EndPoints.articles,{params:{input:input},observe: "body"})
      })
    )
  }


}
