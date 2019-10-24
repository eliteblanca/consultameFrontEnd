import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesApiService } from "../../api/articles-api.service";
import { Article } from "../../article";

@Component({
  selector: 'app-articles-editor-list',
  templateUrl: './articles-editor-list.component.html',
  styleUrls: ['./articles-editor-list.component.css']
})
export class ArticlesEditorListComponent implements OnInit,OnChanges {

  private pagesize = 20;


  ngOnChanges(changes:SimpleChanges){
    if(changes.categorySelected.currentValue){
      this.articlesApi.getArticlesByCategory( this.categorySelected, 0, this.pagesize ).subscribe( articles => {
        this.articles = articles;
      })
    }
  }

  @Input() categorySelected:string;

  public articles:Article[] = [];

  constructor(private articlesApi:ArticlesApiService, private router: Router) {  }

  ngOnInit() {  }

  articuloEliminado(idArticulo:string){
    this.articles = this.articles.filter( article => article.id != idArticulo );
    this.articlesApi.getArticlesByCategory( this.categorySelected, this.articles.length + 1, 1 ).subscribe( articles => {
      this.articles = this.articles.concat(articles);
    })
  }

  goToArticleCreation(){
    this.router.navigate(['/app/articlecreation'],{ queryParams: { category: this.categorySelected }, queryParamsHandling: 'merge' })
  }

  onScroll(event){
    this.articlesApi.getArticlesByCategory( this.categorySelected, this.articles.length, this.pagesize ).subscribe( articles => {
      this.articles = this.articles.concat(articles);
    })
  }
}