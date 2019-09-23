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

export interface user {
    username:string;
    rol:string;
    id:string;
}

@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    constructor(private http: HttpClient) { }

    private host = "http://localhost:3001";
    private endPoints = {
        getUserAllowedlines:(id:string) => `${this.host}/api/users/:idUsuario/allowedlines`.replace(':idUsuario', id ),
        getUsers: `${this.host}/api/users`

    } 

    getUserAllowedlines(idUsuario:string): Observable<AllowedLines> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<AllowedLines>(this.endPoints.getUserAllowedlines(idUsuario), { observe: "body" })
            })
        )
    }

    getUsers():Observable<user[]>{
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<user[]>(this.endPoints.getUsers, { observe: "body" })
            })
        )
    }

}
