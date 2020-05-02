import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, iif, merge, Observable } from 'rxjs';
import { concatMap, filter, map, tap } from "rxjs/operators";
import { ArticlesApiService } from "../../api/articles-api.service";
import { Article } from "../../article";
import { StateService } from "../../services/state.service";
import { ArticleListComponent } from "../article-list/article-list.component";
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

    public articles:Article[] = [];
    public placeholders:any[] = [];
    private articles$:Observable<any>;
    private newQuery$:Observable<any>;
    private newTag$:Observable<any>;
    private currentQuery;
    private currenttag;
    private scrollSubject = new BehaviorSubject(1)
    private scroll$ = this.scrollSubject.asObservable();


    @ViewChild(ArticleListComponent, { static: false })
    articleList: ArticleListComponent;

    constructor(
        public route: ActivatedRoute,
        private articlesApiService: ArticlesApiService,
        private state: StateService
    ) {  }

    ngOnInit() { 
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
            tap(value => this.placeholders = [1,1,1]),
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
                this.placeholders = []
            })
        ).subscribe()
   
        this.articles$.subscribe( )
   
        this.newTag$.subscribe()
   
        this.newQuery$.subscribe()

     }

    ngAfterViewInit() {


    }

    onScroll(event) {        
        this.scrollSubject.next(1);
    }
}