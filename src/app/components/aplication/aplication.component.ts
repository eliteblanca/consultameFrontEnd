import { Component, OnInit, HostListener } from '@angular/core';
import { StateService } from "../../services/state.service";
import { googleAnalytics } from "../../services/googleAnalytics.service";
import { UserService } from "../../services/user.service";
import { ArticlesWebSocketsService } from "../../webSockets/articles-web-sockets.service";
import { UserApiService } from "../../api/user-api.service";

@Component({
    selector: 'app-aplication',
    templateUrl: './aplication.component.html',
    styleUrls: ['./aplication.component.css']
})
export class AplicationComponent implements OnInit{

    
    clicktime:any

    constructor(
        public state:StateService,
        public googleAnalytics:googleAnalytics,
        public userService:UserService,
        public userApi:UserApiService,
        public articlesWebSockets:ArticlesWebSocketsService,
    ) { }    

    ngOnInit() {
        this.googleAnalytics.login(this.state.getValueOf('user').sub)
        this.articlesWebSockets.connect()
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {   
        this.userApi.endUserSesion().subscribe()
    }

}
