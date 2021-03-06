import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, tap, map, delay } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { StateService } from "../services/state.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserApiService } from "../api/user-api.service";
import { forkJoin } from 'rxjs';


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

    private logOutTimer:any;

    constructor(
        private http: HttpClient,
        private state: StateService,
        private userApi: UserApiService,
    ) {  }

    private endPoints = {
        authenticate:`${environment.endpoint}/api/authenticate`,
        reCaptcha:`${environment.endpoint}/api/validateCaptcha`,
        refreshToken:`${environment.endpoint}/api/refresh_token`,
        logOut:`${environment.endpoint}/api/log_out`,
    }

    startSilentRefresh(rawToken){
        if(this.logOutTimer){
            clearTimeout(this.logOutTimer)
        }

        let decoded = helper.decodeToken(rawToken)
        let time = ((new Date(decoded.exp * 1000)).getTime() - (new Date()).getTime()) - 3000

        this.logOutTimer = setTimeout(() => {
            this.refreshToken().subscribe(val => {
                this.state.setToken(val.token)
                this.startSilentRefresh(val.token)
            }, error => {
                this.state.logOut()
            })
        }, time )
        
    }

    login(user: string, pass: string): Observable<boolean> {
        return this.http.post<{ token: string, refreshToken:string }>(this.endPoints.authenticate, { username: user, password: pass }, { observe: "body" }).pipe(
            tap(val => {
                if (val.token) {
                    let decoded = helper.decodeToken(val.token)

                    this.state.setToken(val.token)

                    this.state.setUser({ name: decoded.name, rol: decoded.rol, sub:decoded.sub })

                    this.startSilentRefresh(val.token)
                }
            }),
            map(val => {
                if (val.token) {
                    return true
                } else {
                    return false
                }
            })
        )
    }

    logOut(){
        
        forkJoin(
            this.userApi.endUserSesion(),
            this.http.get<any>(this.endPoints.logOut, { observe: "body" })            
        ).pipe(
            delay(1100)
        )
        .subscribe(response => {
            window.localStorage.setItem('logout', 'true')
            this.state.logOut()
        })
        
    }

    validateCaptcha(token):Observable<captchaResponse>{
        return this.http.post<captchaResponse>(this.endPoints.reCaptcha, { token: token }, { observe: "body" })
    }

    refreshToken():Observable<{ token: string, refreshToken:string }>{
        return this.http.get<{ token: string, refreshToken:string }>(this.endPoints.refreshToken, { observe: "body" })        
    }
}