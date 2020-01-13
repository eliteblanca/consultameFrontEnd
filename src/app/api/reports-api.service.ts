import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type posibleEvents = 'view'|'fav'|'like'|'dislike'|'lecture'|'comment';
export type posibleFilterFields = 'categoria'|'pcrc'|'cliente'|'articulo'|'director'|'coordinador'|'gerente'|'lider';

@Injectable({
    providedIn: 'root'
})
export class ReportsApiService {

    constructor(private http: HttpClient) {  }

    private endPoints = {
        getEvent: `${environment.endpoint}/api/reports/events`
    }
    
    getEvent( event:posibleEvents, filters:{ filter:posibleFilterFields, value:string }[], from:string, to:string ):Observable<{ value:string }>{

        let params = {
            fromdate:from,
            todate:to,
            event:event
        }

        return this.http.post<{ value:string }>(this.endPoints.getEvent, { filters: filters } ,{ params:params, observe: "body" })
    }
}