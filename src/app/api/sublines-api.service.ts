import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import endPoint from "./endPoint";

export interface subline {
    id: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class SublinesApiService {

    constructor(private http: HttpClient) { }

    private host = "http://172.20.20.24:3001";
    private endPoints = {
        postSubline: (id: string) => `/api/lines/:idLine/sublines`.replace(':idLine', id),
        updateSubline: (id: string) => `/api/sublines/:id`.replace(':id', id),
        deleteSubline: (id: string) => `/api/sublines/:id`.replace(':id', id)
    }

    createSubLine(idLine: string, name: string): Observable<subline> {
        return of(null).pipe(
            switchMap(val => this.http.post<subline>(this.endPoints.postSubline(idLine), { name: name }, { observe: "body" }))
        )
    }

    updateSubLine(id: string, name: string): Observable<string> {
        return of(null).pipe(
            switchMap(val => this.http.put<string>(this.endPoints.updateSubline(id), { name: name }, { observe: "body" }))
        )
    }

    deleteSubline(idSubline:string): Observable<any> {
        return of(null).pipe(
            switchMap(val => this.http.delete<any>(this.endPoints.updateSubline(idSubline), { observe: "body" }))
        )
    }

}
