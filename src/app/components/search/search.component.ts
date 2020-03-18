import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable, of, concat } from 'rxjs';
import { filter, map, switchMap, tap } from "rxjs/operators";
import { ArticlesApiService } from "../../api/articles-api.service";
import { Article } from "../../article";
import { EventsService } from "../../services/events.service";
import { StateService } from "../../services/state.service";
import { ArticleListComponent } from "../article-list/article-list.component";
import { googleAnalytics } from "../../services/googleAnalytics.service";
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

    @ViewChild(ArticleListComponent, { static: false })
    articleList: ArticleListComponent;

    constructor(
        public route: ActivatedRoute,
        private eventsService: EventsService,
        private articlesApiService: ArticlesApiService,
        private state: StateService,
        private googleAnalytics:googleAnalytics

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
                this.onScroll(null)
            })
        )

        this.articles$.subscribe( )

        this.newTag$.subscribe()

        this.newQuery$.subscribe()
    }

    onScroll(event) {
        console.log('scroll')
        if(this.currentQuery){

            this.state.selectedPcrc$.pipe(
                filter(pcrc => pcrc.cod_pcrc != ""),
                switchMap(pcrc => {
                    let promises = [0,1,2,3,4,5,6,7,8,9].map(number => {
                        return this.articlesApiService.getArticlesByQuery(
                            pcrc.id_dp_pcrc.toString(),
                            'published',
                            this.articles.length + number,
                            1,
                            { query:this.currentQuery }
                        )
                    })

                    return concat(...promises)
                }),
                tap(articles => this.articles = this.articles.concat(articles))
            ).subscribe()

        } else if(this.currenttag) {
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