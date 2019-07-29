import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EventsService } from "./events.service";

const helper = new JwtHelperService();

type user = {
  sub:string,
  name:string,
  rol:string,
  line:string,
  subLine:string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public events:EventsService) { }

  private _user:user;
  public _selectedSubLine:{line:string, subLine:string};

  get usuario():user{
    return helper.decodeToken(localStorage.getItem("token"));
  }

  set selectedSubLine(newSubLine:{line:string, subLine:string }){
    this._selectedSubLine = newSubLine;
    this.events.newSelectedLine(newSubLine);
  }

  get selectedSubLine():{line:string, subLine:string }{
    return this._selectedSubLine;
  }

}