import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Article } from '../article';
import { switchMap, concatMap } from 'rxjs/operators';
import endPoint from "./endPoint";

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
        getArticles:`${endPoint}/api/articles`,
        postArticle:`${endPoint}/api/articles`,
        getByCategory: (id:string) => `${endPoint}/api/categories/:idCategory/articles`.replace(':idCategory', id),
        getByQuery: (id:string) => `${endPoint}/api/sublines/:idSubline/articles`.replace(':idSubline', id),
        deleteArticle: (id:string) => `${endPoint}/api/articles/:idArticle`.replace(':idArticle', id),
        getArticle: (id:string) => `${endPoint}/api/articles/:idArticle`.replace(':idArticle', id),
        updateArticle: (id:string) => `${endPoint}/api/articles/:idArticle`.replace(':idArticle', id),
        postFavorite: (id:string) => `${endPoint}/api/articles/:idArticle/favorites`.replace(':idArticle', id),
        deleteFavorite: (id:string) => `${endPoint}/api/articles/:idArticle/favorites`.replace(':idArticle', id),
        postLike: (id:string) => `${endPoint}/api/articles/:idArticle/likes`.replace(':idArticle', id),
        deleteLike: (id:string) => `${endPoint}/api/articles/:idArticle/likes`.replace(':idArticle', id),
        postDisLike: (id:string) => `${endPoint}/api/articles/:idArticle/disLikes`.replace(':idArticle', id),
        deleteDisLike: (id:string) => `${endPoint}/api/articles/:idArticle/disLikes`.replace(':idArticle', id),
        getSelfFavorites: `${endPoint}/api/users/me/favorites`,        
    }

    getArticles(): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article[]>(this.endPoints.getArticles, { observe: "body" })
            })
        )
    }

    getArticlesByCategory(categoryId: string, state:postArticleDTO["state"] = 'published' , from:number = 0, size:number = 10): Observable<Article[]> {


        if(typeof from != undefined &&  typeof size != undefined){
            return of(null).pipe(
                switchMap(val => {
                    return this.http.get<Article[]>(this.endPoints.getByCategory(categoryId), { params: { from: from.toString(), size: size.toString(), state: state }, observe: "body" })
                })
            )
            
        }

    }

    getArticlesByQuery(subline: string, state:postArticleDTO["state"] = 'published' , from:number = 0, size:number = 10, query:{ tag: string } | { query: string } ): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article[]>(this.endPoints.getByQuery(subline), { params: { from:from.toString(), size:size.toString(), state:state, ...query }, observe: "body" })
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

}