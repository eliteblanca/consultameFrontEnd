import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { concatMap, filter, tap, retryWhen, takeUntil, delayWhen, skip } from 'rxjs/operators';
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

    public searchError = false;
    public searchErrorMessage = 10;
    private errorSubject = new BehaviorSubject(true)
    public error$ = this.errorSubject.asObservable().pipe(skip(3),tap(result => {
        this.searchError = false
        this.placeholders = []
    }));
    private errorTimeout;
    
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
            retryWhen(errors => {
                return errors.pipe(
                    tap(errors => {
                        this.errorSubject.next(true)                        
                        this.placeholders = []                        
                    }),
                    takeUntil(this.error$),
                    tap(result => {
                        this.searchError = true
                        this.errorTimeout = setInterval(()=>{
                            this.searchErrorMessage--
                        },1000)
                    }),
                    delayWhen(() => timer(10*1000)),
                    tap(() => {
                        console.log('retrying...')  
                        this.searchError = false                         
                        clearInterval(this.errorTimeout)
                        this.searchErrorMessage = 10
                    }))
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