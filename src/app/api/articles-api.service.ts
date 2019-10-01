import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Article } from '../article';
import { switchMap, concatMap } from 'rxjs/operators';

export type postArticleDTO = {
    title: string;
    content: string;
    obj:string;
    tags: string[];
    resume?: string;
    attached: string[];
    role: string;
    category: string;
}

@Injectable({
    providedIn: 'root'
})
export class ArticlesApiService {

    constructor(private http: HttpClient) { }

    private host = "http://localhost:3001/api";
    private endPoints = {
        getArticles:`${this.host}/articles`,
        postArticle:`${this.host}/articles`,
        getByCategory: (id:string) => `${this.host}/categories/:idCategory/articles`.replace(':idCategory', id),
        getByQuery: (id:string) => `${this.host}/sublines/:idSubline/articles`.replace(':idSubline', id),
        deleteArticle: (id:string) => `${this.host}/articles/:idArticle`.replace(':idArticle', id),
        getArticle: (id:string) => `${this.host}/articles/:idArticle`.replace(':idArticle', id),
        updateArticle: (id:string) => `${this.host}/articles/:idArticle`.replace(':idArticle', id),
    }

    getArticles(): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article[]>(this.endPoints.getArticles, { observe: "body" })
            })
        )
    }

    getArticlesByCategory(categoryId: string): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article[]>(this.endPoints.getByCategory(categoryId), { observe: "body" })
            })
        )
    }

    getArticlesByQuery(params: { query: string, subline: string }): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article[]>(this.endPoints.getByQuery(params.subline), { params: { query: params.query }, observe: "body" })
            })
        )
    }
    
    deleteArticle(idArticulo:string) :Observable<any> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.delete<any>(this.endPoints.deleteArticle(idArticulo), { observe: "body" })
            })
        )
    }

    postArticle(article:postArticleDTO):Observable<Article>{
        return this.http.post<Article>(this.endPoints.postArticle, article , { observe: "body" })
    }

    getArticle(articleId:string): Observable<Article> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article>(this.endPoints.getArticle(articleId), { observe: "body" })
            })
        )
    }

    updateArticle(articleId:string, article:postArticleDTO):Observable<{ status: string }>{
        return this.http.put<{ status: string }>(this.endPoints.updateArticle(articleId), article , { observe: "body" })
    }
}