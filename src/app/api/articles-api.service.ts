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
        postFavorite: (id:string) => `${this.host}/articles/:idArticle/favorites`.replace(':idArticle', id),
        deleteFavorite: (id:string) => `${this.host}/articles/:idArticle/favorites`.replace(':idArticle', id),
        postLike: (id:string) => `${this.host}/articles/:idArticle/likes`.replace(':idArticle', id),
        deleteLike: (id:string) => `${this.host}/articles/:idArticle/likes`.replace(':idArticle', id),
        postDisLike: (id:string) => `${this.host}/articles/:idArticle/disLikes`.replace(':idArticle', id),
        deleteDisLike: (id:string) => `${this.host}/articles/:idArticle/disLikes`.replace(':idArticle', id),
        getSelfFavorites: `${this.host}/users/me/favorites`,
        
    }

    getArticles(): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article[]>(this.endPoints.getArticles, { observe: "body" })
            })
        )
    }

    getArticlesByCategory(categoryId: string, from?:string, size?:string): Observable<Article[]> {

        if(!!from && !!size){
            return of(null).pipe(
                switchMap(val => {
                    return this.http.get<Article[]>(this.endPoints.getByCategory(categoryId), { params: { from: from, size: size }, observe: "body" })
                })
            )
            
        }else{
            return of(null).pipe(
                switchMap(val => {
                    return this.http.get<Article[]>(this.endPoints.getByCategory(categoryId), { observe: "body" })
                })
            )

        }

    }

    getArticlesByQuery(params: { query: string, subline: string, from?:string, size?:string }): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => {
                if(params.from && params.size){
                    return this.http.get<Article[]>(this.endPoints.getByQuery(params.subline), { params: { query: params.query ,from: params.from,size: params.size  }, observe: "body" })
                }else{
                    return this.http.get<Article[]>(this.endPoints.getByQuery(params.subline), { params: { query: params.query }, observe: "body" })
                }
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

    getSelfFavorites(from?:string, size?:string): Observable<Article[]> {
        return this.http.get<Article[]>(this.endPoints.getSelfFavorites, { params: { from: from, size: size }, observe: "body" })
    }

}