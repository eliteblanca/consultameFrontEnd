import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

export type posibleEvents = 'view'|'fav'|'like'|'dislike'|'lecture'|'comment'
export type posibleItems = 'articles' | 'favorite' | 'like' | 'dislike'
export type posibleFilterFields = 'categoria'|'pcrc'|'cliente'|'articulo'|'director'|'coordinador'|'gerente'|'lider'

export type report = {
    totalItems:number,
    items:{
        articleId:string,
        title:string,
        views:number,    
        likes:number,
        dislikes:number,
        indiceDisgusto:number,
        indiceGusto:number,
        favoritos:number,
        favoritismo:string,
        comments:number,
        indiceUso:string,
        lecturabilidad:string
    }[]
}

export type commentsReport = {
    totalItems:number,
    items:{
        tituloArticulo:string,
        text:string,
        publicationDate:number,
        user:string,
        username:string,
        article:string,
        lider:string,
        coordinador:string,
        gerente:string,
        director:string,
        category:string,
        cliente:string,
        pcrc:string,
        id:string
    }[]
}

export type changesReport = {
    totalItems:number,
    items:{
        articleId:string,
        articlecontent:string,
        category:string,
        cliente:string,
        pcrc:string,
        event:string,
        eventDate:number,
        previoustate:string,
        user:string,
        id:string
    }[]
}

@Injectable({
    providedIn: 'root'
})
export class ReportsApiService {

    constructor(private http: HttpClient) {  }

    private endPoints = {
        getEvent: `${environment.endpoint}/api/reports/events`,
        getCount: `${environment.endpoint}/api/reports/count`,
        getViews: `${environment.endpoint}/api/reports/views`,
        getFullReport: `${environment.endpoint}/api/reports/fullreport`,
        getComments: `${environment.endpoint}/api/reports/comments`,
        getChanges: `${environment.endpoint}/api/reports/changes`,
        getChange: (idChange:string) => `${environment.endpoint}/api/reports/changes/${idChange}`,
    }

    getEvent( event:posibleEvents, filters:{ filter:posibleFilterFields, value:string }[], from:string, to:string ):Observable<{ value:string }>{
        let params = {
            fromdate:from,
            todate:to,
            event:event
        }

        return this.http.post<{ value:string }>(this.endPoints.getEvent, { filters: filters } ,{ params:params, observe: "body" })
    }

    getCount( item:posibleItems, filters:{ filter:posibleFilterFields, value:string }[], date:string ):Observable<{ value:number }>{
        let params = { date : date, item: item }
        return this.http.post<{ value:number }>(this.endPoints.getCount, { filters: filters } ,{ params:params, observe: "body" })
    }

    getViews(date:number, filters:{ filter:posibleFilterFields, value:string }[], minDuration:number, maxDuration:number){
        let params = {
            date: date.toString(),
            minduration: minDuration.toString(),
            maxduration: maxDuration.toString()
        }

        return this.http.post<{ value:number }>(this.endPoints.getViews, { filters: filters } ,{ params:params, observe: "body" })
    }

    getFullReport( date:number, filters:{ filter:posibleFilterFields, value:string }[], from:number, to:number ){
        let params = {
            date:date.toString(),
            from:from.toString(),
            to: to.toString()
        }

        return this.http.post<report>(this.endPoints.getFullReport, { filters: filters } ,{ params:params, observe: "body" })
    }

    getComents( dateFrom:number, dateTo:number, filters:{ filter:posibleFilterFields, value:string }[], from:number, to:number ){
        let params = {
            dateto: dateTo.toString(),
            datefrom: dateFrom.toString(),
            from: from.toString(),
            to : to.toString()
        }

        return this.http.post<commentsReport>(this.endPoints.getComments, { filters: filters } ,{ params:params, observe: "body" })
    }

    getChanges( dateFrom:number, dateTo:number, filters:{ filter:posibleFilterFields, value:string }[], from:number, to:number ){
        let params = {
            dateto: dateTo.toString(),
            datefrom: dateFrom.toString(),
            from: from.toString(),
            to : to.toString()
        }

        return this.http.post<changesReport>(this.endPoints.getChanges, { filters: filters } ,{ params:params, observe: "body" })
    }

    getChange(changeId:string){
        return this.http.get<changesReport['items'][0]>(this.endPoints.getChange(changeId),{ observe: "body" })
    }
}