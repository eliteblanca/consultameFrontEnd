import { Component, OnInit } from '@angular/core';
import { ApiService, UserService } from 'src/app/services';
import { Router } from '@angular/router';
import { mergeMap, tap, filter } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { UserApiService, AllowedLines } from "../../api/user-api.service";

type user = {
    sub: string,
    name: string,
    rol: string,
    line: string,
    subLine: string
}

@Component({
    selector: 'app-acount-menu',
    templateUrl: './acount-menu.component.html',
    styleUrls: ['./acount-menu.component.css']
})
export class AcountMenuComponent implements OnInit {
    public lines: AllowedLines;
    public selectedLine: AllowedLines[0];
    public selectedSubLine: AllowedLines[0]['sublines'][0];

    constructor(public userApi: UserApiService, public router: Router, public userService: UserService) { }

    ngOnInit() {
        this.userApi.getUserAllowedlines(this.userService.usuario.sub)
            .pipe(
                filter(lines => !!lines && !!lines[0] && !!lines[0].sublines[0])
            ).subscribe(lines => {
                this.lines = lines;
                this.selectedLine = lines[0];
                this.selectedSubLine = this.selectedLine.sublines[0];
                this.userService.selectedSubLine = { line: this.selectedLine, subLine: this.selectedSubLine };
            })
    }

    changeLine(line: AllowedLines[0]) {
        this.selectedSubLine = line.sublines[0]
        this.userService.selectedSubLine = { line: this.selectedLine, subLine: this.selectedSubLine };
        // this.subLines = this.lines.find(line => line.name == event.target.value).sublines;
    }

    changeSubLine(subLine) {
        this.selectedSubLine = subLine;
        this.userService.selectedSubLine = { line: this.selectedLine, subLine: this.selectedSubLine };
    }

}