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

    private host = "http://localhost:3001";
    private endPoint = `${this.host}/api/articles`;

    getArticles(params: { query?: string, category?: string, subline?: string }): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article[]>(this.endPoint, { params: params, observe: "body" })
            })
        )
    }

}
