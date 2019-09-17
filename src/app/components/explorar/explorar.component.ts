import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from "rxjs/operators";
import { ArticlesApiService } from "../../api/articles-api.service";
import { CategoriesApiService, category } from "../../api/categories-api.service";
import { Article } from "../../article";
import { ApiService, EventsService } from "../../services";



@Component({
    selector: 'app-explorar',
    templateUrl: './explorar.component.html',
    styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {

    public articles: Article[];
    public categories: category[];

    constructor(
        public route: ActivatedRoute,
        public api: ApiService,
        public router: Router,
        public events: EventsService,
        private articlesApiService: ArticlesApiService,
        private categoriesApi: CategoriesApiService
    ) { }

    ngOnInit() {
        this.events.onNewSelectedLine$.pipe(
            filter(selectedLine => selectedLine.line != null && selectedLine.subLine != null),
            switchMap(selectedLine => this.categoriesApi.getCategories(selectedLine.subLine.id))
        ).subscribe(categories => {
            this.categories = categories
            this.articles = [];
        })
    }

    categoriaSeleccionada(categoria: string) {
        this.articlesApiService.getArticlesByCategory(categoria).subscribe(val => {
            this.articles = val;
        })
    }

}

