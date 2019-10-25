import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ArticlesApiService } from "../../api/articles-api.service";
import { switchMap, tap, filter, map, publishBehavior, refCount } from "rxjs/operators";
import { Article, articleConf } from "../../article";
import { EventsService } from "../../services/events.service";
import { of, Observable, combineLatest, merge } from 'rxjs';
import { ArticleListComponent } from "../article-list/article-list.component";
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

    public articles:Article[] = [];
    private newQuery$:Observable<any>;
    private newSeledtedSublineId$:Observable<any>;
    private newTag$:Observable<any>;

    private currentQuery;
    private currenttag;
    private selectedSublineId = '';

    @ViewChild(ArticleListComponent, { static: false })
    articleList: ArticleListComponent;

    constructor(
        public route: ActivatedRoute,
        private eventsService: EventsService,
        private articlesApiService: ArticlesApiService
    ) { }

    ngOnInit() {  }
    
    ngAfterViewInit() {
        this.newQuery$ = this.route.queryParams.pipe(
            filter(params => {
                return !!params.query
            }),
            map(params => params.query),
            tap(query => {
                this.currentQuery = query
                this.currenttag = null;
            }),
            switchMap(query => this.eventsService.newSelectedLineSource),
            filter(selectedLine => selectedLine.line != null && selectedLine.subLine != null),
            map(selectedLine => selectedLine.subLine.id),
            switchMap(selectedSubLineid =>               
                this.articlesApiService.getArticlesByQuery(
                    selectedSubLineid,
                    'published',
                    0,
                    10,
                    {query:this.currentQuery}
                )
            ),
            tap(articles => {
                this.articles = articles
            })
        )
    
        this.newSeledtedSublineId$ = this.eventsService.newSelectedLineSource.pipe(
            filter(selectedLine => selectedLine.line != null && selectedLine.subLine != null),
            map(selectedLine => selectedLine.subLine.id),
            tap(selectedSublineId => this.selectedSublineId = selectedSublineId),
            switchMap(selectedSublineId => {
                if(this.currentQuery){
                    return this.articlesApiService.getArticlesByQuery(
                        selectedSublineId,
                        'published',
                        0,
                        10,
                        {query:this.currentQuery}
                    )
                }else if(this.currenttag){
                    return this.articlesApiService.getArticlesByQuery(
                        selectedSublineId,
                        'published',
                        0,
                        10,
                        {tag:this.currenttag}
                    )
                }
            }),
            tap(articles=>{
                this.articles = articles
            })
        )
    
        this.newTag$ = this.route.queryParams.pipe(
            filter(params => {
                return !!params.tag
            }),
            map(params => params.tag),
            tap( tag => {
                this.currenttag = tag 
                this.currentQuery = null;
            }),
            switchMap(query => this.eventsService.newSelectedLineSource),
            filter(selectedLine => selectedLine.line != null && selectedLine.subLine != null),
            map(selectedLine => selectedLine.subLine.id),
            switchMap(selectedSubLineid =>               
                this.articlesApiService.getArticlesByQuery(
                    selectedSubLineid,
                    'published',
                    0,
                    10,
                    {tag:this.currenttag}
                )
            ),
            tap(articles => {
                this.articles = articles
            })
        )

        this.newTag$.subscribe()
        this.newQuery$.subscribe()
        this.newSeledtedSublineId$.subscribe()
     }

    onScroll(event) {
        if(this.currentQuery){
            this.articlesApiService.getArticlesByQuery(
                this.selectedSublineId,
                'published',
                this.articles.length,
                10,
                { query:this.currentQuery }
            ).pipe(
                tap(articles => this.articles = this.articles.concat(articles))                
            ).subscribe()

        }else if(this.currenttag){
            this.articlesApiService.getArticlesByQuery(
                this.selectedSublineId,
                'published',
                this.articles.length,
                10,
               { tag:this.currenttag}
            ).pipe(
                tap(articles => this.articles = this.articles.concat(articles))                
            ).subscribe()
        }
    }
}