import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "../../services/index";
import { ArticlesApiService } from "../../api/articles-api.service";
import { switchMap, tap, filter } from "rxjs/operators";
import { Article, articleConf } from "../../article";
import { EventsService } from "../../services/events.service";
import { of } from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

    public busqueda: string = "";
    public articles: Article[];
    private params: any;

    constructor(
        public route: ActivatedRoute,
        private eventsService: EventsService,
        private articlesApiService: ArticlesApiService
    ) { }

    ngOnInit() {
        this.route.queryParams.pipe(
            tap(params => {
                this.params = params
            }),
            switchMap(params => {
                return this.eventsService.newSelectedLineSource
            }),
            filter(selectedLine => selectedLine.line != null && selectedLine.subLine != null),
            switchMap(selectedLine => {
                if (selectedLine.subLine) {
                    return this.articlesApiService.getArticlesByQuery({ query: this.params.query, subline: selectedLine.subLine.id })
                } else {
                    return of(null)
                }
            })
        ).subscribe((articles) => {
            if (articles) {
                this.articles = articles;
            }
        })
    }

    ngAfterViewInit() {
        //setTimeout(()=>this._masonry.reOrderItems(),1000);    
    }
}