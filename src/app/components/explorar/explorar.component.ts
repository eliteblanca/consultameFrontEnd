import { Component, OnInit } from '@angular/core';
import { ArticlesApiService } from "../../api/articles-api.service";
import { CategoriesApiService, category } from "../../api/categories-api.service";
import { Article } from "../../article";
import { EventsService } from "../../services";
import { filter, switchMap } from 'rxjs/operators';


@Component({
    selector: 'app-explorar',
    templateUrl: './explorar.component.html',
    styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {

    public articles: Article[];
    public categories: category[];

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

        console.log(categoria)

        this.articlesApi.getArticlesByCategory(categoria.id).subscribe(val => {
            console.log(val)
            this.articles = val;
        })
    }

}

