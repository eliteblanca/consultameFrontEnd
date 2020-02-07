import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Article } from '../article';
import { switchMap, concatMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export type postArticleDTO = {
    title: string;
    content: string;
    obj:string;
    tags: string[];
    resume?: string;
    attached: string[];
    role: string;
    category: string;
    state: 'published'|'archived';
}

@Injectable({
    providedIn: 'root'
})
export class ArticlesApiService {

    constructor(private http: HttpClient) { }

    private endPoints = {
        getArticles:`${environment.endpoint}/api/articles`,
        postArticle:`${environment.endpoint}/api/articles`,
        getByCategory: (idCategory:string) => `${environment.endpoint}/api/categories/${idCategory}/articles`,
        getByQuery: (idPcrc:string) => `${environment.endpoint}/api/pcrc/${idPcrc}/articles`,
        deleteArticle: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}`,
        getArticle: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}`,
        updateArticle: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}`,
        postFavorite: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}/favorites`,
        deleteFavorite: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}/favorites`,
        postLike: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}/likes`,
        deleteLike: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}/likes`,
        postDisLike: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}/disLikes`,
        deleteDisLike: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}/disLikes`,
        getSelfFavorites: `${environment.endpoint}/api/users/me/favorites`,
        postArticleView: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}/views`,
    }

    getArticles(): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article[]>(this.endPoints.getArticles, { observe: "body" })
            })
        )
    }

    getArticlesByCategory(categoryId: string, state:postArticleDTO["state"] = 'published' , from:number = 0, size:number = 10, query?:string): Observable<Article[]> {

        if(!!query){
            return of(null).pipe(
                switchMap(val => {
                    return this.http.get<Article[]>(this.endPoints.getByCategory(categoryId), { params: { from: from.toString(), size: size.toString(), state: state, query:query }, observe: "body" })
                })
            )
        } else {
            return of(null).pipe(
                switchMap(val => {
                    return this.http.get<Article[]>(this.endPoints.getByCategory(categoryId), { params: { from: from.toString(), size: size.toString(), state: state }, observe: "body" })
                })
            )
        }

    }

    getArticlesByQuery(idPcrc: string, state:postArticleDTO["state"] = 'published' , from:number = 0, size:number = 10, query:{ tag: string } | { query: string } ): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article[]>(this.endPoints.getByQuery(idPcrc), { params: { from:from.toString(), size:size.toString(), state:state, ...query }, observe: "body" })
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

    postFavorite(articleId:string):Observable<{status:string}>{
        return this.http.post<{status:string}>(this.endPoints.postFavorite(articleId), null , { observe: "body" })
    }

    deleteFavorite(articleId:string):Observable<any>{
        return this.http.delete<any>(this.endPoints.postFavorite(articleId), { observe: "body" })
    }

    postLike(articleId:string):Observable<{status:string}>{
        return this.http.post<{status:string}>(this.endPoints.postLike(articleId), null , { observe: "body" })
    }

    deleteLike(articleId:string):Observable<any>{
        return this.http.delete<any>(this.endPoints.deleteLike(articleId), { observe: "body" })
    }

    postDisLike(articleId:string):Observable<{status:string}>{
        return this.http.post<{status:string}>(this.endPoints.postDisLike(articleId), null , { observe: "body" })
    }

    deleteDisLike(articleId:string):Observable<any>{
        return this.http.delete<any>(this.endPoints.deleteDisLike(articleId), { observe: "body" })
    }

    getSelfFavorites(from?:number, size?:number): Observable<Article[]> {
        return this.http.get<Article[]>(this.endPoints.getSelfFavorites, { params: { from: from.toString(), size: size.toString() }, observe: "body" })
    }

    postArticleView(articleId:string ,initialDate:number, finalDate:number )  {

        let body = {
            initialDate:initialDate,
            finalDate:finalDate
        }

        return this.http.post<{status:string}>(this.endPoints.postArticleView(articleId), body , { observe: "body" })
    }
}