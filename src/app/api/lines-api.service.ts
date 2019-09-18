import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface line {
    id: string;
    name: string;
}

export interface lineWithSublines extends line {
    sublines: {
        name: string,
        id: string
    }[]
}

@Injectable({
    providedIn: 'root'
})
export class LinesApiService {

    constructor(private http: HttpClient) { }

    private host = "http://localhost:3001";
    private endPoints = {
        getLineas: `${this.host}/api/lines`,
        postLine: `${this.host}/api/lines`,
        updateLine: (id: string) => `${this.host}/api/lines/:id`.replace(':id', id),
        deleteLine: (id: string) => `${this.host}/api/lines/:id`.replace(':id', id),
    }

    getLines(includeSublines: boolean = true): Observable<lineWithSublines[]> {
        return of(null).pipe(
            switchMap(val => {
                if (includeSublines) {
                    return this.http.get<lineWithSublines[]>(this.endPoints.getLineas, { params: { include: 'subline' }, observe: "body" })
                } else {
                    return this.http.get<lineWithSublines[]>(this.endPoints.getLineas, { observe: "body" })
                }
            })
        )
    }

    createLine(name: string): Observable<line> {
        return of(null).pipe(
            switchMap(val => this.http.post<line>(this.endPoints.postLine, { name: name }, { observe: "body" }))
        )
    }

    updateLine(id: string, name: string): Observable<string> {
        return of(null).pipe(
            switchMap(val => this.http.put<string>(this.endPoints.updateLine(id), { name: name }, { observe: "body" }))
        )
    }

    deleteLine(id: string): Observable<string> {
        return of(null).pipe(
            switchMap(val => this.http.delete<string>(this.endPoints.deleteLine(id), { observe: "body" }))
        )
    }


}