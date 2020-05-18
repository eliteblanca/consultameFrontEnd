import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { concatMap, filter, tap } from 'rxjs/operators';
import { ArticlesApiService } from "../../api/articles-api.service";
import { category } from "../../api/categories-api.service";
import { Article } from "../../article";
import { StateService } from "../../services/state.service";

type mode = 'category'|'top'|'update'

@Component({
    selector: 'app-explorar',
    templateUrl: './explorar.component.html',
    styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {

    public articles: Article[] = []
    public placeholders: any[] = []
    private categorySelected:category
    public mode:mode = 'update'
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
            tap(value => this.placeholders = [1,1,1]),
            concatMap(value =>{

                if(this.mode == "category"){
                    return this.articlesApi.getArticlesByCategory(
                        this.categorySelected.id,
                        'published',
                        this.articles.length,
                        6
                    )                    
                }

                if(this.mode == 'update'){
                    return this.articlesApi.getArticlesByUpdate(
                        this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString(),                        
                        this.articles.length,
                        6
                    )
                }

                if(this.mode == 'top'){
                    return this.articlesApi.getArticlesByViews(
                        this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString(),
                        this.articles.length,
                        6
                    )
                }
            }),
            tap(articles => {
                this.articles = this.articles.concat(articles)
                this.placeholders = []
            })
        ).subscribe()
    }

    categoriaSeleccionada(categoria:category) {
        this.categorySelected = categoria
        this.changeModeTo('category')
    }

    changeModeTo(mode:mode){
        this.mode = mode
        this.articles = []
        this.scrollSubject.next(1)
    }

    onScroll(event){
        this.scrollSubject.next(1)
    }

}