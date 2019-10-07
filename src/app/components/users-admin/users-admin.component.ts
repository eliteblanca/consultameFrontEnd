import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { LinesApiService, lineWithSublines } from "../../api/lines-api.service";
import { AllowedLines, user, UserApiService } from "../../api/user-api.service";

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    private userApi: UserApiService,
    private linesApi: LinesApiService
  ) { }

  public users: user[];
  public lines: lineWithSublines[];
  public linesNotAllowed: lineWithSublines[];
  public selectedUser: user;
  public allowedLines: AllowedLines = [];
  public sublinesToAllow: { name: string, id: string }[] = [];
  public roles = [
    "admin",
    "user",
    "publicador"
  ];

  public allowLinesMode = false;
  public newUserMode = false;
  public newRolMode = false;

  public newUsername;
  public newUserpassword;
  public newUserRol = this.roles[0];


  ngOnInit() {
    this.route.data.subscribe(({ users }: { users: user[] }) => {
      this.users = users;
    })

    this.linesApi.getLines(true).subscribe(lines => {
      this.lines = lines;
    })
  }

  onSelectedUser(user: user) {
    this.newUserMode = false;
    this.selectedUser = user; 
    this.allowLinesMode = false;
    if(user){
      this.userApi.getUserAllowedlines(user.id).subscribe(lines => {
        this.allowedLines = lines;
        this.filterLinesAllowed(this.allowedLines)
      })
    }
  }

  private filterLinesAllowed(allowedLines: AllowedLines) {

    this.linesNotAllowed = this.lines.map(x => Object.assign({}, x));

    this.linesNotAllowed = this.linesNotAllowed.map(line => {
      let allowedLineIndex = allowedLines.findIndex(allowedLine => allowedLine.id == line.id)
      if (allowedLineIndex < 0) {
        return line
      } else if (allowedLines[allowedLineIndex].sublines.length == line.sublines.length) {
        return null
      } else {
        line.sublines = line.sublines.filter(subline =>
          !allowedLines[allowedLineIndex].sublines.some(allowedSubline => allowedSubline.id == subline.id)
        )

        return line
      }
    }).filter(line => !!line)

  }

  confirmSublinesToAllow() {

    from(this.sublinesToAllow).pipe(
      mergeMap(sublineToAllow =>
        this.userApi.postUserAllowedLines(this.selectedUser.id, sublineToAllow.id).pipe(
          map((result) => sublineToAllow)
        )
      )
    ).subscribe(subline => {
      let linea = this.lines.find(linea => {
        return linea.sublines.some(sublinea => sublinea.id == subline.id)
      })

      let indice_linea_ya_habilitada = this.allowedLines.findIndex(allowedLine => allowedLine.id == linea.id)

      if (indice_linea_ya_habilitada >= 0) {
        this.allowedLines[indice_linea_ya_habilitada].sublines.push({ line: linea.id, ...subline })
      } else {
        let lineaNueva: AllowedLines[0] = {
          name: linea.name,
          id: linea.id,
          sublines: [
            {
              line: linea.id,
              ...subline
            }
          ]
        }

        this.allowedLines.push(lineaNueva)
      }

      this.filterLinesAllowed(this.allowedLines)
      this.sublinesToAllow = [];
      this.allowLinesMode = false;
    });

  }

  sublineaHabilitada(subline: { name: string, id: string }) {
    if (this.sublinesToAllow.some(({ id }) => subline.id == id)) {
      this.sublinesToAllow = this.sublinesToAllow.filter(({ id }) => id != subline.id)
    } else {
      this.sublinesToAllow.push(subline)
    }
  }

  sublineaEliminada(sublineId: string) {
    this.userApi.deleteUserAllowedLine(this.selectedUser.id, sublineId).subscribe(result => {
      this.allowedLines = this.allowedLines.map(linea => {
        if (linea.sublines.some(sublinea => sublinea.id == sublineId)) {
          linea.sublines = linea.sublines.filter(subline => subline.id != sublineId)
        }

        if (linea.sublines.length == 0) {
          return null
        }

        return linea
      }).filter(linea => !!linea)

      this.filterLinesAllowed(this.allowedLines);

    })
  }

  onNewUser() {
    this.selectedUser = {
      username: "",
      rol: "admin",
      id: ""
    }
    this.newUserMode = true;
    this.allowLinesMode = true;
    this.newUsername = ""
    this.newUserpassword = ""
    this.newUserRol = this.roles[0]
    this.allowedLines = [];
    this.filterLinesAllowed(this.allowedLines)
  }

  confirmarUsuarioNuevo() {
    this.userApi.postUser({
      username: this.newUsername,
      password: this.newUserpassword,
      rol: this.newUserRol
    }).subscribe(newUser=>{
      this.users.push(newUser);
      this.newUserMode = false;
      this.selectedUser = newUser;
      this.confirmSublinesToAllow()
    })
  }

  editUserRole(newRol:string){
    this.userApi.updateUserRol(this.selectedUser.id,newRol).subscribe(result => {
      this.selectedUser.rol = newRol;
    })
  }
}