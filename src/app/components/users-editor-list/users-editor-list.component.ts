import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserApiService,user } from "../../api/user-api.service";

@Component({
  selector: 'app-users-editor-list',
  templateUrl: './users-editor-list.component.html',
  styleUrls: ['./users-editor-list.component.css']
})
export class UsersEditorListComponent implements OnInit {

  @Input() users:user[];
  @Output() onSelectedUser = new EventEmitter();
  @Output() onNewUser = new EventEmitter();

  constructor(private userApi:UserApiService) { }

  ngOnInit() {
  }

  selectUser(user:user){
    this.onSelectedUser.next(user)
  }

  deleteUser(idUsuario:string){
    this.userApi.deleteUser(idUsuario).subscribe(result=>{
      this.users = this.users.filter( user => user.id != idUsuario)
      this.selectUser(null);
    })
  }

  newUser(){
    this.onNewUser.next(true)
  }
}