import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from "../../article";
import { ArticleListComponent } from "../article-list/article-list.component";
import { ArticlesApiService } from "../../api/articles-api.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  
  public articles: Article[];
  private pagesize = 20;

  @ViewChild(ArticleListComponent, { static: false })
  articleList: ArticleListComponent;

  constructor(
    private articlesApi:ArticlesApiService
  ) {  }

  ngOnInit() {
    this.articlesApi.getSelfFavorites(0,this.pagesize).subscribe(articles => {
      this.articles = articles
    })
  }

  onScroll(){
    this.articlesApi.getSelfFavorites(this.articles.length,this.pagesize).subscribe(articles => {
      this.articles = this.articles.concat(articles)
    })
  }

  onDeleteFavorite(article:Article){
    this.articles = this.articles.filter( _article => _article.id != article.id)
    this.articlesApi.getSelfFavorites(this.articles.length + 1 , 1).subscribe(articles => {
      this.articles = this.articles.concat(articles)
    })
  }

}