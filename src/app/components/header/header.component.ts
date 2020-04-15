import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from "../../article";
import settingsIcon from '@iconify/icons-mdi/settings';
import { StateService } from "../../services/state.service";
import { ArticlesWebSocketsService } from "../../webSockets/articles-web-sockets.service";
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css', '../../../../node_modules/ng-masonry-grid/ng-masonry-grid.css']
})
export class HeaderComponent implements OnInit {

    notifications:number = 0;

    constructor(
        public state:StateService,
        public articlesWebSockets:ArticlesWebSocketsService
    ) {  }

    settingsIcon = settingsIcon;

    newSearchSubs: Subscription;

    ngOnInit() { 
        this.articlesWebSockets.newArticleNotifications$.pipe(
            tap(notifications => {
                this.notifications = notifications.length
            })
        ).subscribe()
    }

    toggleSideSheet(){
        this.state.toogleSideSheet()
    }

    toggleNotificatons(){
        this.articlesWebSockets.togleNotifications()
    }

}