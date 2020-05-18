import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EventsService } from "./events.service";
import { AllowedLines, UserApiService } from "../api/user-api.service";
import { Router } from '@angular/router';

const helper = new JwtHelperService();

type user = {
    sub: string,
    name: string,
    rol: 'admin' | 'user' | 'publicador'
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        public events: EventsService,
        public router: Router,
        public userApi:UserApiService
    ) { }

    private _user: user;
    public _selectedSubLine: { line: AllowedLines[0], subLine: AllowedLines[0]['sublines'][0] };

    get usuario(): user {
        return helper.decodeToken(localStorage.getItem("token"));
    }

    logOut() {
        
        this.userApi.endUserSesion().subscribe(result =>{
            localStorage.removeItem("token")
            this.router.navigate(['/login'])
        })

    }
}