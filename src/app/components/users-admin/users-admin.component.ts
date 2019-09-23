import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { user } from "../../api/user-api.service";
import { AllowedLines, UserApiService } from "../../api/user-api.service";
import { LinesApiService,lineWithSublines } from "../../api/lines-api.service";

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {

  constructor( 
    public route: ActivatedRoute,
    private userApi:UserApiService,
    private linesApi:LinesApiService
  ) {  }

  public users:user[];
  public lines:lineWithSublines[];
  public selectedUser:user;
  public allowedLines:AllowedLines = [];

  ngOnInit() {
    this.route.data.subscribe(( { users }:{ users:user[] } ) => {
      this.users = users;
    })

    this.linesApi.getLines(true).subscribe(lines => {
      this.lines = lines;
    })
  }

  onSelectedUser(user:user){
    this.selectedUser = user;
    this.userApi.getUserAllowedlines(user.id).subscribe(lines => {
      this.allowedLines = lines;
    })
  }
}