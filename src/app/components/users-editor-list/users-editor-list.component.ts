import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserApiService,user } from "../../api/user-api.service";
import { StateService } from "../../services/state.service";

@Component({
  selector: 'app-users-editor-list',
  templateUrl: './users-editor-list.component.html',
  styleUrls: ['./users-editor-list.component.css']
})
export class UsersEditorListComponent implements OnInit {

  @Output() onSelectedUser = new EventEmitter();
  @Output() onNewUser = new EventEmitter();

  constructor(
    private userApi:UserApiService,
    public state:StateService
  ) {  }

  ngOnInit() {  
    this.state.userslist$.subscribe(result => console.log('ngOnInit',result))
  }

  deleteUser(idUsuario:string){
    // this.userApi.deleteUser(idUsuario).subscribe(result => {
    //   this.selectUser(null);
    // })
  }

  newUser(){
    // this.onNewUser.next(true)
  }
}