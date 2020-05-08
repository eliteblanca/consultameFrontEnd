import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { googleAnalytics } from "../../services/googleAnalytics.service";
import { StateService } from "../../services/state.service";
import { UserService } from "../../services/user.service";
@Component({
    selector: 'app-aplication',
    templateUrl: './aplication.component.html',
    styleUrls: ['./aplication.component.css']
})
export class AplicationComponent implements OnInit, OnDestroy {

    
    clicktime:any

    constructor(
        public state:StateService,
        public googleAnalytics:googleAnalytics,
        public userService:UserService,
    ) { }

    ngOnDestroy(): void {
        clearTimeout(this.clicktime)
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
      this.userService.logOut()
    }

    ngOnInit() {
        this.googleAnalytics.login(this.userService.usuario.sub)
        this.clicktime = setTimeout(() => {
            this.userService.logOut()
        }, 1000*300);
    }


    siteClic(event){

        clearTimeout(this.clicktime)

        this.clicktime = setTimeout(() => {            
            this.userService.logOut()
        }, 1000*300);
    }
}
