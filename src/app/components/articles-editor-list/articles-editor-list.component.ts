import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesApiService } from "../../api/articles-api.service";
import { Article } from "../../article";
import { BehaviorSubject } from 'rxjs';
import { tap, concatMap, startWith, endWith } from 'rxjs/operators';

@Component({
  selector: 'app-articles-editor-list',
  templateUrl: './articles-editor-list.component.html',
  styleUrls: ['./articles-editor-list.component.css']
})
export class ArticlesEditorListComponent implements OnInit,OnChanges {

  private pagesize = 20;
  public articlesLoadingSpinner = true;
  private scrollSubject = new BehaviorSubject(1)
  private scroll$ = this.scrollSubject.asObservable();

  @Input() categorySelected:string;
  @Input() state:Article['state'];

  public articles:Article[] = [];
  public currentSearch = '';

  constructor(private articlesApi:ArticlesApiService, private router: Router) {  }

  ngOnChanges(changes:SimpleChanges){
    if(!changes.categorySelected.isFirstChange() && changes.categorySelected.currentValue){
      this.currentSearch = '';
      this.scrollSubject.next(1)      
    }
  }

  ngOnInit() {
    this.scroll$.pipe(
      tap(() => {
        this.articlesLoadingSpinner = true;
      }),
      concatMap(() =>
        this.articlesApi.getArticlesByCategory( this.categorySelected, this.state, this.articles.length, this.pagesize, this.currentSearch )
        
      ),
      tap( articles => {
        this.articles = this.articles.concat(articles);
        this.articlesLoadingSpinner = false;
      })
    ).subscribe()
  }

  articuloEliminado(idArticulo:string){
    this.articles = this.articles.filter( article => article.id != idArticulo );
    this.articlesApi.getArticlesByCategory( this.categorySelected, this.state,this.articles.length + 1, 1 ).subscribe( articles => {
      this.articles = this.articles.concat(articles);
    })
  }

  goToArticleCreation(){
    this.router.navigate(['/app/articlecreation'],{ queryParams: { category: this.categorySelected }, queryParamsHandling: 'merge' })
  }

  onScroll(event){
    this.scrollSubject.next(1)
  }

  search(text:string){
    this.articles = [];
    this.currentSearch = text;
    this.scrollSubject.next(1)
  }
}