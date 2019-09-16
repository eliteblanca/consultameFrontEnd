import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface subline {
    id: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class SublinesApiService {

    constructor(private http: HttpClient) { }

    private host = "http://localhost:3001";
    private endPoints = {
        postSublines: (id: string) => `${this.host}/api/lines/:idLine/sublines`.replace(':idLine', id),
        updateSublines: (id: string) => `${this.host}/api/sublines/:id`.replace(':id', id),
    }

    createSubLine(idLine: string, name: string): Observable<subline> {
        return of(null).pipe(
            switchMap(val => this.http.post<subline>(this.endPoints.postSublines(idLine), { name: name }, { observe: "body" }))
        )
    }

    updateSubLine(id: string, name: string): Observable<string> {
        return of(null).pipe(
            switchMap(val => this.http.put<string>(this.endPoints.updateSublines(id), { name: name }, { observe: "body" }))
        )
    }

}
