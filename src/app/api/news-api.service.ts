import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface news {
  id: string;
  title: string;
  content: string;
  obj: string;
  attached: string[];
  publicationDate: string;
  modificationDate: string;
  modificationUser: string;
  creator: string;
  commentsList: string;
  state: string;
  subline: string;
}

export interface newsDTO {
  title: string;
  content: string;
  obj: string;
  attached: string[];
  state: string;
  subline: string;
}

export interface UpdateNewsDTO {
  title:string;
  content:string;
  obj:string;
  state:string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  constructor(private http: HttpClient) { }

  private host = "http://localhost:3001";
  private endPoints = {
    getNews: (idSubline: string) => `${this.host}/api/sublines/:idSubline/news`.replace(':idSubline', idSubline),
    getSingleNews: (idNews: string) => `${this.host}/api/news/:idNews`.replace(':idNews', idNews),
    postNews: `${this.host}/api/news`,
    updateNews: (idNews: string) => `${this.host}/api/news/:idNews`.replace(':idNews', idNews),
    deleteNews: (idNews: string) => `${this.host}/api/news/:idNews`.replace(':idNews', idNews),
  }

  public getNews(idSubline: string, state:'published'|'archived'): Observable<news[]> {
    return this.http.get<news[]>(this.endPoints.getNews(idSubline), { params: { state: state }, observe: "body" })
  }

  public postNews(news: newsDTO): Observable<news> {
    return this.http.post<news>(this.endPoints.postNews, news, { observe: "body" })
  }

  public getSingleNews(idNews: string): Observable<news> {
    return this.http.get<news>(this.endPoints.getSingleNews(idNews), { observe: "body" })
  }

  public updateNews(idNews: string, news:UpdateNewsDTO): Observable<{ status:string}>{
    return this.http.put<{ status:string}>(this.endPoints.updateNews(idNews), news, { observe: "body" }) 
  }

  public deleteNews(idNews: string): Observable<{ status:string}>{
    return this.http.delete<{ status:string}>(this.endPoints.deleteNews(idNews),{ observe: "body" })
  }
}