import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesApiService } from "../../api/articles-api.service";
import { CategoriesApiService, category, categoryRaw } from "../../api/categories-api.service";
import { Article } from "../../article";
import { EventsService } from "../../services";
import { filter, switchMap, tap } from 'rxjs/operators';
import { ArticleListComponent } from "../article-list/article-list.component";
import { StateService } from "../../services/state.service";

@Component({
    selector: 'app-explorar',
    templateUrl: './explorar.component.html',
    styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {

    public articles: Article[];
    public categories: category[];
    private categorySelected:category;
    private pagesize = 20;

    @ViewChild(ArticleListComponent, { static: false })
    articleList: ArticleListComponent;

    constructor(
        public events: EventsService,
        private articlesApi: ArticlesApiService
    ){  }

    ngOnInit() {  }

    categoriaSeleccionada(categoria:category) {
        this.categorySelected = categoria;
        this.articlesApi.getArticlesByCategory(categoria.id, 'published' , 0, this.pagesize).subscribe(articles => {
            this.articles = this.articles.concat(articles)
        })
    }

    onScroll(event){
        this.articlesApi.getArticlesByCategory(this.categorySelected.id, 'published' ,this.articleList.articles.length, this.pagesize).subscribe(articles => {
            this.articles = this.articles.concat(articles)
        })
    }

}