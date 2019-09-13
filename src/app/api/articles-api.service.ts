import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Article } from '../article';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ArticlesApiService {

    constructor(private http: HttpClient) { }

    private host = "http://localhost:3001/api";
    private endPoint = `${this.host}/articles`;

    getArticles(params: { query?: string, category?: string, subline?: string }): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article[]>(this.endPoint, { params: params, observe: "body" })
            })
        )
    }

    getArticlesByCategory(category: string): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article[]>(`${this.host}/categories/:idCategory/articles`.replace(':idCategory', category), { params: { category: category }, observe: "body" })
            })
        )
    }

    getArticlesByQuery(params: { query: string, subline: string }): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article[]>(`${this.host}/sublines/:idSubline/articles`.replace(':idSubline', params.subline), { params: { query: params.query }, observe: "body" })
            })
        )
    }

}
