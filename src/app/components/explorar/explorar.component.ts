import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesApiService } from "../../api/articles-api.service";
import { CategoriesApiService, category } from "../../api/categories-api.service";
import { Article } from "../../article";
import { EventsService } from "../../services";
import { filter, switchMap } from 'rxjs/operators';
import { ArticleListComponent } from "../article-list/article-list.component";

@Component({
    selector: 'app-explorar',
    templateUrl: './explorar.component.html',
    styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {

    public articles: Article[];
    public categories: category[];
    private categorySelected:category;
    private pageNumber:number = 0;

    @ViewChild(ArticleListComponent, { static: false })
    articleList: ArticleListComponent;

    constructor(
        public events: EventsService,
        private articlesApi: ArticlesApiService,
        private categoriesApi: CategoriesApiService,
        private eventsService:EventsService
    ) { }

    ngOnInit() {
        return this.eventsService.newSelectedLineSource.pipe(
            filter(selectedLine => selectedLine.line != null && selectedLine.subLine != null),
            switchMap(selectedLine => this.categoriesApi.getCategories(selectedLine.subLine.id))
        ).subscribe(categories => this.categories = categories)
    }

    categoriaSeleccionada(categoria:category) {
        this.pageNumber = 0;
        this.categorySelected = categoria;
        this.articlesApi.getArticlesByCategory(categoria.id,'0','10').subscribe(val => {
            this.articles = val;
        })
    }
    
    onScroll(event){
        this.pageNumber++;

        console.log(this.pageNumber)

        this.articlesApi.getArticlesByCategory(this.categorySelected.id, (this.pageNumber*10).toString(), '10').subscribe(val => {
            console.log(val)
            this.articleList.concatArticles(val);
        })
    }

}