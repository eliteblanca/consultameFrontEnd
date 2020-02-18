import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesApiService } from "../../api/articles-api.service";
import { category } from "../../api/categories-api.service";
import { Article } from "../../article";
import { ArticleListComponent } from "../article-list/article-list.component";
import { StateService } from "../../services/state.service";
import { tap, switchMap } from 'rxjs/operators';
import { of, concat } from 'rxjs';

@Component({
    selector: 'app-explorar',
    templateUrl: './explorar.component.html',
    styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {

    public articles: Article[] = [];
    private categorySelected:category;
    private pagesize = 20;

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
    }

    categoriaSeleccionada(categoria:category) {

        this.categorySelected = categoria;

        this.onScroll(null)

        this.articles = [];

    }

    onScroll(event){
        of(null).pipe(
            switchMap(value => {
                let promises = [0,1,2,3,4].map(number => {
                    return this.articlesApi.getArticlesByCategory(
                        this.categorySelected.id,
                        'published',
                        this.articleList.articles.length + number,
                        1
                    )
                })

                return concat(...promises)
            }),
            tap(article => {
                this.articles = this.articles.concat(article)
            })
        ).subscribe()
    }

}