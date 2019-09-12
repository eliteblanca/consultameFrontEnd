import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, tap, map } from "rxjs/operators";
import { Article } from "../article";
import { EventsService } from './events.service';

const host = "http://localhost:3001"

const EndPoints = {
    suggestions: `${host}/api/suggestions`,
    articles: `${host}/api/articles`,
    article: `${host}/api/articles/:id`,
    likes: `${host}/api/articles/:id/likes`,
    disLikes: `${host}/api/articles/:id/disLikes`,
    userLines: `${host}/api/users/:id/lines`,
    userSubLines: `${host}/api/users/:id/lines/:lineId/sublines`,
    categories: `${host}/api/lines/:lineId/subLines/:SublineId/categories`
}

type categories = {
    name: string,
    order: number,
    desplegado: boolean,
    subcategories?: categories
}[];

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient, private events: EventsService) { }

    getSuggestions(suggestion?: string): Observable<string[]> {

        let selectedline = this.events.newSelectedLineSource.getValue();

        let options = { subline: selectedline.subLine.id, input: suggestion };

        return of(null).pipe(
            switchMap(val => {
                if (suggestion) {
                    return this.http.get<string[]>(EndPoints.suggestions, { params: options, observe: "body" })
                } else {
                    return this.http.get<string[]>(EndPoints.suggestions, { observe: "body" });
                }
            })
        )
    }

    getArticle(articleId: string): Observable<Article> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article>(EndPoints.article.replace(':id', articleId), { observe: "body" })
            })
        )
    }

    postArticles(articles: Article[]): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => this.http.post<Article[]>(EndPoints.articles, articles, { observe: "body" }))
        )
    }

    getCategories(lineId: string, sublineId: string): Observable<categories> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<categories>(EndPoints.categories.replace(':lineId', lineId).replace(':SublineId', sublineId), { observe: "body" })
            })
        )
    }

    getUserSubLines(userId: string, line: string): Observable<{ name: string, sublines: string[] }> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<{ name: string, sublines: string[] }>(EndPoints.userSubLines.replace(':id', userId).replace(':lineId', line), { observe: "body" })
            })
        )
    }

    postLike(articleId: string): Observable<string[]> {
        return of(null).pipe(
            switchMap(val => this.http.post<string[]>(EndPoints.likes.replace(':id', articleId), null, { observe: "body" }))
        )
    }

    deleteLike(articleId: string): Observable<string[]> {
        return of(null).pipe(
            switchMap(val => this.http.delete<string[]>(EndPoints.likes.replace(':id', articleId), { observe: "body" }))
        )
    }

    postDisLike(articleId: string): Observable<string[]> {
        return of(null).pipe(
            switchMap(val => this.http.post<string[]>(EndPoints.disLikes.replace(':id', articleId), null, { observe: "body" }))
        )
    }

    deleteDisLike(articleId: string): Observable<string[]> {
        return of(null).pipe(
            switchMap(val => this.http.delete<string[]>(EndPoints.disLikes.replace(':id', articleId), { observe: "body" }))
        )
    }


}