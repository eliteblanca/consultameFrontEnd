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

  constructor(private userApi:UserApiService) { }

  ngOnInit() {
  }

  selectUser(user:user){
    this.onSelectedUser.next(user)
  }
}