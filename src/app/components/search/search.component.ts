import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable, of, concat, Subject, BehaviorSubject, iif } from 'rxjs';
import { filter, map, switchMap, tap, concatMap } from "rxjs/operators";
import { ArticlesApiService } from "../../api/articles-api.service";
import { Article } from "../../article";
import { EventsService } from "../../services/events.service";
import { StateService } from "../../services/state.service";
import { ArticleListComponent } from "../article-list/article-list.component";
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

    public articles:Article[] = [];
    private articles$:Observable<any>;
    private newQuery$:Observable<any>;
    private newTag$:Observable<any>;
    private vlen = 0;
    private currentQuery;
    private currenttag;
    private scrollSubject = new BehaviorSubject(1)
    private scroll$ = this.scrollSubject.asObservable();


    @ViewChild(ArticleListComponent, { static: false })
    articleList: ArticleListComponent;

    constructor(
        public route: ActivatedRoute,
        private eventsService: EventsService,
        private articlesApiService: ArticlesApiService,
        private state: StateService
    ) {  }

    ngOnInit() {  }

    ngAfterViewInit() {

        this.newQuery$ = this.route.queryParams.pipe(
            filter(params => {
                return !!params.query
            }),
            map(params => ({query:params.query})),
            tap(query => {
                this.currentQuery = query.query
                this.currenttag = null;
            }))

        this.newTag$ = this.route.queryParams.pipe(
            filter(params => {
                return !!params.tag
            }),
            map(params => ({ tag:params.tag})),
            tap(tag => {
                this.currentQuery = null
                this.currenttag = tag.tag;
            }))

        this.articles$ = merge(this.newQuery$, this.newTag$).pipe(            
            tap(articles => {
                this.articles = []
                this.scrollSubject.next(1);
            })
        )

        this.scroll$.pipe(
            concatMap(value => {
                return iif( () =>!!this.currenttag,
                    this.articlesApiService.getArticlesByQuery(
                        this.state.getValueOf("selectedPcrc").id_dp_pcrc.toString(),
                        'published',
                        this.articles.length,
                        6,
                        { tag:this.currenttag}
                    ),
                    this.articlesApiService.getArticlesByQuery(
                        this.state.getValueOf("selectedPcrc").id_dp_pcrc.toString(),
                        'published',
                        this.articles.length,
                        6,
                        { query:this.currentQuery }
                    )
                )
            }),
            tap(articles => {
                this.articles = this.articles.concat(articles)
            })
        ).subscribe()

        this.articles$.subscribe( )

        this.newTag$.subscribe()

        this.newQuery$.subscribe()

    }

    onScroll(event) {        
        this.scrollSubject.next(1);
    }
}