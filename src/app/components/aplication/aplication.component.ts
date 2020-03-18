import { Component, OnInit } from '@angular/core';
import { StateService } from "../../services/state.service";
import { googleAnalytics } from "../../services/googleAnalytics.service";
import { UserService } from "../../services/user.service";
@Component({
    selector: 'app-aplication',
    templateUrl: './aplication.component.html',
    styleUrls: ['./aplication.component.css']
})
export class AplicationComponent implements OnInit {

    constructor(
        public state:StateService,
        public googleAnalytics:googleAnalytics,
        public userService:UserService,
    ) { }

    ngOnInit() {
        this.googleAnalytics.login(this.userService.usuario.sub)
    }

}
