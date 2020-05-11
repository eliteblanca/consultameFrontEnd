import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, tap, map } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { StateService } from "../services/state.service";
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

export type captchaResponse = {
    success: boolean,
    challenge_ts: string,
    hostname: string,
    score: number,
    action: string
}

@Injectable({
    providedIn: 'root'
})
export class AutenticateApiService {
    
    constructor(
        private http: HttpClient,
        private state: StateService,
    ) {  }

    private endPoints = {
        authenticate:`${environment.endpoint}/api/authenticate`,
        reCaptcha:`${environment.endpoint}/api/validateCaptcha`
    }

    login(user: string, pass: string): Observable<boolean> {
        return of(null).pipe(
            switchMap(val => this.http.post<{ tokem: string }>(this.endPoints.authenticate, { username: user, password: pass }, { observe: "body" })),
            tap(val => {
                if (val.tokem) {
                    this.state.setUser(helper.decodeToken(val.tokem))
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

    validateCaptcha(token):Observable<captchaResponse>{
        return this.http.post<captchaResponse>(this.endPoints.reCaptcha, { token: token }, { observe: "body" })
    }
}