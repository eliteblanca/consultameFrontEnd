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
export class FilesApiService {

    constructor(private http: HttpClient) { }

    private host = "http://172.20.20.24:3001/files";
    private endPoints = {
        deleteFile:(idArticle, fileName) => `${endPoint}/${idArticle}/${fileName}`,
    }

    deletFile(idArticle:string, fileName:string): Observable<Article[]> {
        return this.http.delete<Article[]>(this.endPoints.deleteFile(idArticle, fileName), { observe: "body" })
    }

}

