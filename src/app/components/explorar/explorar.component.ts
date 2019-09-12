import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { Article } from "../../article";
import { ApiService, EventsService } from "../../services";
import { ArticlesApiService } from "../../api/articles-api.service";

type categories = {
    name: string,
    order: number,
    desplegado: boolean,
    subcategories?: categories
}[];
@Component({
    selector: 'app-explorar',
    templateUrl: './explorar.component.html',
    styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {

    public articles: Article[];
    public categories: categories;

    constructor(
        public route: ActivatedRoute,
        public api: ApiService,
        public router: Router,
        public events: EventsService,
        private articlesApiService: ArticlesApiService
    ) { }

    ngOnInit() {

        this.events.onNewSelectedLine$.pipe(
            switchMap(newLine => {
                return this.api.getCategories(newLine.line.id, newLine.subLine.id)
            })
        ).subscribe(categories => {
            console.log(categories);
            this.categories = categories;
            this.articles = [];
        })
    }

    categoriaSeleccionada(categoria: string) {
        this.articlesApiService.getArticles({ category: categoria }).subscribe(val => {
            this.articles = val;
        })
    }
}