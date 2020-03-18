import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { EventsService } from './services/index';
import { Title } from "@angular/platform-browser";
import { googleAnalytics } from "./services/googleAnalytics.service";


@Component({
    selector: 'app-root',
    styles: [],
    templateUrl: './app.component.html',
    providers: [Title]
})
export class AppComponent implements OnInit {
    constructor(
        public events: EventsService,
        public router: Router,
        public route: ActivatedRoute,
        public title: Title,
        public googleAnalytics:googleAnalytics
    ) {  }

    ngOnInit() {

        let performanceData = window.performance;

        this.googleAnalytics.timing('timing', 'pageLoad', Math.round(performanceData.now()))

        this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd){
                this.googleAnalytics.pagePath(event.urlAfterRedirects)
            }
        })

        this.events.onNewSearch$.subscribe(newSearch => {
            if (newSearch) {
                this.title.setTitle(newSearch);
                this.router.navigate(['/app/search'], { queryParams: { query: newSearch } })
            }
        })

        this.route.queryParamMap.subscribe(params => {
            if (params.has("query")) {
                this.events.newQuery(params.get('query'));
            }
        })
    }

}
