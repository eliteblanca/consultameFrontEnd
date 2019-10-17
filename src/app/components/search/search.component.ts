import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesApiService } from "../../api/articles-api.service";
import { switchMap, tap, filter } from "rxjs/operators";
import { Article, articleConf } from "../../article";
import { EventsService } from "../../services/events.service";
import { of } from 'rxjs';
import { ArticleListComponent } from "../article-list/article-list.component";
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

    public busqueda: string = "";
    public articles: Article[];
    private params: any;
    private currentPage: number = 0;

    @ViewChild(ArticleListComponent, { static: false })
    articleList: ArticleListComponent;

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
                    return this.articlesApiService.getArticlesByQuery({
                        query: this.params.query,
                        subline: selectedLine.subLine.id,
                        from: (this.currentPage * 10).toString(),
                        size: '10'
                    })
                } else {
                    return of(null)
                }
            })
        ).subscribe((articles) => {
            if (articles) {
                this.articles = articles;
                this.currentPage = 0;
            }
        })
    }

    ngAfterViewInit() {
        //setTimeout(()=>this._masonry.reOrderItems(),1000);    
    }

    onScroll(event) {
        this.currentPage++;
        this.articlesApiService.getArticlesByQuery({
            query: this.params.query,
            subline: this.eventsService.newSelectedLineSource.getValue().subLine.id,
            from: (this.currentPage * 10).toString(),
            size: '10'
        }).pipe(
            filter(articles => articles.length > 0)
        ).subscribe(newArticles => {
            this.articleList.concatArticles(newArticles)
        })
    }
}