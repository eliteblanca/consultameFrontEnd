import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface news {
  id:string;
  title:string;
  content:string;
  obj:string;
  attached:string[];
  publicationDate:string;
  modificationDate:string;
  modificationUser:string;
  creator:string;
  commentsList:string;
  state:string;
  subline:string;
}

export interface newsDTO {
  title:string;
  content:string;
  obj:string;
  attached:string[];
  state:string;
  subline:string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  constructor(private http: HttpClient) { }

  private host = "http://localhost:3001";
  private endPoints = {
      getNews: (idSubline:string)=>`${this.host}/api/sublines/:idSubline/news`.replace(':idSubline',idSubline),
      postNews: `${this.host}/api/news`,
      updateNews: (id: string) => `${this.host}/api/lines/:id`.replace(':id', id),
      deleteNews: (id: string) => `${this.host}/api/lines/:id`.replace(':id', id),
  }

  public getNews(idSubline:string):Observable<news[]>{
    return this.http.get<news[]>(this.endPoints.getNews(idSubline),{ observe: "body" } )
  }
  
  public postNews(news:newsDTO):Observable<news>{
    return this.http.post<news>(this.endPoints.postNews, news ,{ observe: "body" } )
  }

}