import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesApiService } from "../../api/articles-api.service";
import { category } from "../../api/categories-api.service";
import { Article } from "../../article";
import { ArticleListComponent } from "../article-list/article-list.component";
import { StateService } from "../../services/state.service";
import { tap, switchMap, concatMap, filter } from 'rxjs/operators';
import { of, concat, BehaviorSubject, iif } from 'rxjs';

@Component({
    selector: 'app-explorar',
    templateUrl: './explorar.component.html',
    styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {

    public articles: Article[] = []
    private categorySelected:category
    private scrollSubject = new BehaviorSubject(1)
    private scroll$ = this.scrollSubject.asObservable()

    @ViewChild(ArticleListComponent, { static: false })
    articleList: ArticleListComponent;

    constructor(
        private state: StateService,
        private articlesApi: ArticlesApiService
    ){  }

    ngOnInit() { 
        this.state.selectedPcrc$.pipe(
            tap(pcrc => this.articles = [])
        ).subscribe()

        this.scroll$.pipe(
            filter(value => !!this.categorySelected) ,
            concatMap(value =>
                this.articlesApi.getArticlesByCategory(
                    this.categorySelected.id,
                    'published',
                    this.articleList.articles.length,
                    6
                )
            ),
            tap(articles => {
                this.articleList.articles = this.articleList.articles.concat(articles)
            })
        ).subscribe()
    }

    categoriaSeleccionada(categoria:category) {
        this.articles = [];
        this.categorySelected = categoria;
        this.scrollSubject.next(1);
    }

    onScroll(event){
        this.scrollSubject.next(1);
    }

}