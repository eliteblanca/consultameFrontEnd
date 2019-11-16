import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EventsService } from "./events.service";
import { AllowedLines } from "../api/user-api.service";


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

    constructor(public events: EventsService) { }

    private _user: user;
    public _selectedSubLine: { line: AllowedLines[0], subLine: AllowedLines[0]['sublines'][0] };

    get usuario(): user {
        return helper.decodeToken(localStorage.getItem("token"));
    }

    set selectedSubLine(newSubLine: { line: AllowedLines[0], subLine: AllowedLines[0]['sublines'][0] }) {
        this._selectedSubLine = newSubLine;
        this.events.newSelectedLine(newSubLine);
    }

    get selectedSubLine(): { line: AllowedLines[0], subLine: AllowedLines[0]['sublines'][0] } {
        return this._selectedSubLine;
    }

}