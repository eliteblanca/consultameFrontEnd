import { Component, OnInit } from '@angular/core';
import { ApiService, UserService  } from 'src/app/services';
import { Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

type user = {
  sub:string,
  name:string,
  rol:string,
  line:string,
  subLine:string
}

@Component({
  selector: 'app-acount-menu',
  templateUrl: './acount-menu.component.html',
  styleUrls: ['./acount-menu.component.css']
})
export class AcountMenuComponent implements OnInit {
  public lines:{name:string,sublines:string[]}[];
  public subLines:string[];


  constructor(public api:ApiService, public router:Router, public userService:UserService) { }

  ngOnInit() {
    this.api.getUserLines(this.userService.usuario.sub)
    .pipe(
      mergeMap((lines)=>{
        return forkJoin(...lines.map(line=>{
          return this.api.getUserSubLines(this.userService.usuario.sub, line)
        }))
      })
    )
    .subscribe((lines:{name:string,sublines:string[]}[])=>{
      this.lines = lines;
      this.subLines = this.lines[0].sublines;      
      this.userService.selectedSubLine = {line:this.lines[0].name, subLine: this.lines[0].sublines[0]};
    })
  }

  changeLine(event){
    console.log(event.target.value)
    this.userService.selectedSubLine = {line:event.target.value, subLine:this.lines.find(line=>line.name == event.target.value ).sublines[0]};
    this.subLines = this.lines.find(line=>line.name == event.target.value ).sublines;
  }

  changeSubLine(event){
    console.log("prueba 1")
    this.userService.selectedSubLine = {line:this.userService.selectedSubLine.line, subLine:event.target.value};
  }

}