import { Component, OnInit } from '@angular/core';
import { StateService } from "../../services/state.service";
import { user } from "../../api/user-api.service";
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserApiService } from "../../api/user-api.service";

@Component({
  selector: 'app-usersconfig',
  templateUrl: './usersconfig.component.html',
  styleUrls: ['./usersconfig.component.css']
})
export class UsersconfigComponent implements OnInit {

  constructor( 
    public state:StateService,
    public userApi:UserApiService
  ) {  }

  ngOnInit() { 
  }

  public roles:user['rol'][] = ["admin","publicador","user"]

  userRolChange = ({value}) => {
    of(value).pipe(
      switchMap(rol => this.userApi.updateUserRol(this.state.getSelectedUser().cedula, rol))
    ).subscribe()
  }
}