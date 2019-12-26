import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from "rxjs/operators";
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

    private currentQuery;
    private currenttag;
    private selectedSublineId = '';

    @ViewChild(ArticleListComponent, { static: false })
    articleList: ArticleListComponent;

    constructor(
        public route: ActivatedRoute,
        private eventsService: EventsService,
        private articlesApiService: ArticlesApiService,
        private state: StateService,
    ) {  }

    ngOnInit() {  }

    ngAfterViewInit() {

        this.newQuery$ = this.route.queryParams.pipe(
            filter(params => {
                return !!params.query
            }),
            map(params => ({query:params.query})),
            tap(query => {
                this.currentQuery = query
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
            switchMap(query =>
                this.articlesApiService.getArticlesByQuery(
                    this.state.getValueOf("selectedPcrc").id_dp_pcrc.toString(),
                    'published',
                    0,
                    10,
                    query
                )
            ),
            tap(articles => {
                this.articles = articles
            })
        )

        this.articles$.subscribe( )

        this.newTag$.subscribe()
        
        this.newQuery$.subscribe()
    }

    onScroll(event) {
        if(this.currentQuery){
            this.articlesApiService.getArticlesByQuery(
                this.state.getValueOf("selectedPcrc").id_dp_pcrc.toString(),
                'published',
                this.articles.length,
                10,
                { query:this.currentQuery }
            ).pipe(
                tap(articles => this.articles = this.articles.concat(articles))                
            ).subscribe()

        }else if(this.currenttag){
            this.articlesApiService.getArticlesByQuery(
                this.state.getValueOf("selectedPcrc").id_dp_pcrc.toString(),
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