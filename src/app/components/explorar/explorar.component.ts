import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { concatMap, filter, tap } from 'rxjs/operators';
import { ArticlesApiService } from "../../api/articles-api.service";
import { category } from "../../api/categories-api.service";
import { Article } from "../../article";
import { StateService } from "../../services/state.service";

@Component({
    selector: 'app-explorar',
    templateUrl: './explorar.component.html',
    styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {

    public articles: Article[] = []
    public placeholders: any[] = []
    private categorySelected:category
    private scrollSubject = new BehaviorSubject(1)
    private scroll$ = this.scrollSubject.asObservable()

    constructor(
        private state: StateService,
        private articlesApi: ArticlesApiService
    ){  }

    ngOnInit() { 
        this.state.selectedPcrc$.pipe(
            tap(pcrc => this.articles = [])
        ).subscribe()

        this.scroll$.pipe(
            filter(value => !!this.categorySelected),
            tap(value => this.placeholders = [1,1,1]),
            concatMap(value =>
                this.articlesApi.getArticlesByCategory(
                    this.categorySelected.id,
                    'published',
                    this.articles.length,
                    6
                )
            ),
            tap(articles => {
                this.articles = this.articles.concat(articles)
                this.placeholders = []
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