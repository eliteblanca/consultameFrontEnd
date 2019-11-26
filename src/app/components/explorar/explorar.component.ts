import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesApiService } from "../../api/articles-api.service";
import { category } from "../../api/categories-api.service";
import { Article } from "../../article";
import { EventsService } from "../../services";
import { ArticleListComponent } from "../article-list/article-list.component";

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
        public events: EventsService,
        private articlesApi: ArticlesApiService
    ){  }

    ngOnInit() {  }

    categoriaSeleccionada(categoria:category) {

        this.categorySelected = categoria;

        console.log(categoria)

        this.articlesApi.getArticlesByCategory(categoria.id, 'published' , 0, this.pagesize).subscribe(articles => {
            this.articles = []; // recetear los articulos
            this.articles = this.articles.concat(articles);
        })
    }

    onScroll(event){
        this.articlesApi.getArticlesByCategory(this.categorySelected.id, 'published' ,this.articleList.articles.length, this.pagesize).subscribe(articles => {
            this.articles = this.articles.concat(articles)
        })
    }

}