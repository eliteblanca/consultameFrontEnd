import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Article } from "../../article";
import { ArticlesApiService } from "../../api/articles-api.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-articles-editor-list',
  templateUrl: './articles-editor-list.component.html',
  styleUrls: ['./articles-editor-list.component.css']
})
export class ArticlesEditorListComponent implements OnInit,OnChanges {

  ngOnChanges(changes:SimpleChanges){
    if(changes.categorySelected.currentValue){
      this.articlesApi.getArticlesByCategory( this.categorySelected ).subscribe( articles => {
        this.articles = articles;
      })
    }
  }

  @Input() categorySelected:string;

  public articles:Article[] = [];

  constructor(private articlesApi:ArticlesApiService, private router: Router) {  }

  ngOnInit() {
    
  }

  articuloEliminado(idArticulo:string){
    this.articles = this.articles.filter( article => article.id != idArticulo );
  }

  goToArticleCreation(){
    console.log(this.categorySelected)
    this.router.navigate(['/app/articlecreation'],{ queryParams: { category: this.categorySelected }, queryParamsHandling: 'merge' })
  }
}