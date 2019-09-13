import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from "rxjs";
import { switchMap, map, filter, findIndex } from "rxjs/operators";
import { Article } from "../../article";
import { ApiService, EventsService } from "../../services";
import { ArticlesApiService } from "../../api/articles-api.service";
import { CategoriesApiService, categories } from "../../api/categories-api.service";

type category = {
    id: string;
    name: string;
    position: number;
    icon: string;
    group: string;
    desplegado: boolean,
    subcategories?: category[]
}

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
            this.categories = this.reorderCategories(categories);
            console.log(this.categories)
            this.articles = [];
        })
    }

    categoriaSeleccionada(categoria: string) {
        this.articlesApiService.getArticlesByCategory(categoria).subscribe(val => {
            this.articles = val;
        })
    }

    reorderCategories(categories: categories): category[] {

        let categoriesAux = categories.map(category => { return { subcategories: [], desplegado: false, ...category } })

        let categoriesToDelete = [];
        while (categoriesAux.some(category => category.group != undefined)) {
            for (let i = 0; i < categoriesAux.length; i++) {
                if (!categoriesAux.some(category => category.group == categoriesAux[i].id)) {
                    let groupIndex = categoriesAux.findIndex(category => category.id == categoriesAux[i].group)
                    categoriesAux[groupIndex].subcategories.push(categoriesAux[i])
                    categoriesToDelete.push(categoriesAux[i].id)
                }
            }

            categoriesAux = categoriesAux.filter(category => !categoriesToDelete.includes(category.id))
        }

        return categoriesAux;
    }
}

