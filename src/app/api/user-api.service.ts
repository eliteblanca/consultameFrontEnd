import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
interface line {
    name: string;
}

interface subline {
    name: string;
    line: string;
}

export type AllowedLines = {
    name: string;
    id: string;
    sublines: {
        id: string;
        name: string;
        line: string;
    }[]
}[];

@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    constructor(private http: HttpClient) { }

    private host = "http://localhost:3001";
    private endPoint = `${this.host}/api/users/:idUsuario/allowedlines`;

    getUserAllowedlines(userId): Observable<AllowedLines> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<AllowedLines>(this.endPoint.replace(':idUsuario', userId), { observe: "body" })
            })
        )
    }
}
