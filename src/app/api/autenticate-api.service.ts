import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, tap, map } from "rxjs/operators";
import endPoint from "./endPoint";

@Injectable({
    providedIn: 'root'
})
export class AutenticateApiService {

    constructor(private http: HttpClient) { }

    private host = "http://172.20.20.24:3001";
    private endPoint = `${endPoint}/api/authenticate`;

    login(user: string, pass: string): Observable<boolean> {
        return of(null).pipe(
            switchMap(val => this.http.post<{ tokem: string }>(this.endPoint, { username: user, password: pass }, { observe: "body" })),
            tap(val => {
                if (val.tokem) {
                    localStorage.setItem('token', val.tokem);
                }
            }),
            map(val => {
                if (val.tokem) {
                    return true
                } else {
                    return false
                }
            })
        )
    }
}