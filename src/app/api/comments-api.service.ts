import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import endPoint from "./endPoint";

export type postCommentDTO = {
  replyTo?:string;
  text:string;
}

export type comment = {
  article:string;
  publicationDate:number;
  user:string;
  username:string;
  replyTo:string;
  text:string;
  id:string;
  replies?:comment[]
}

@Injectable({
  providedIn: 'root'
})
export class CommentsApiService {

  private host = "http://172.20.20.24:3001";

  private endPoints = {
      postComment: ( articleId:string) => `/api/articles/${articleId}/comments`,
      getComments: ( articleId:string) => `/api/articles/${articleId}/comments`,
      getReplies: ( commentId:string) => `/api/comments/${commentId}/replies`
  };

  constructor(private http: HttpClient) { }

  postComment(comment: postCommentDTO, articleId:string): Observable<comment>{
    console.log({articleId})
    return this.http.post<comment>(this.endPoints.postComment(articleId), comment, { observe: "body" })
  }

  getComments( articleId:string, params?: { from:number, size:number }): Observable<comment[]>{
    if( params ){
      return this.http.get<comment[]>(this.endPoints.getComments(articleId), { params: { from: params.from.toString(), size: params.size.toString() }, observe: "body" })
    }else{
      return this.http.get<comment[]>(this.endPoints.getComments(articleId), { observe: "body" })
    }
  }

  getRepliesTo(commentid:string, params?: { from:number, size:number }): Observable<comment[]>{
    if( params ){
      return this.http.get<comment[]>(this.endPoints.getReplies(commentid), { params: { from: params.from.toString(), size: params.size.toString() }, observe: "body" })
    }else{
      return this.http.get<comment[]>(this.endPoints.getReplies(commentid), { observe: "body" })
    }
  }

}