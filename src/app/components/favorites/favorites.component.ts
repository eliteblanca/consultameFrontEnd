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
  private currentPage: number = 1;
  private offset = 0;

  @ViewChild(ArticleListComponent, { static: false })
  articleList: ArticleListComponent;

  constructor(
    private articlesApi:ArticlesApiService
  ) {  }

  ngOnInit() {
    this.articlesApi.getSelfFavorites('0','10').subscribe(articles => {
      this.articles = articles
    })
  }

  onScroll(){
    console.log(this.currentPage);
    
    this.articlesApi.getSelfFavorites((this.currentPage*10).toString(),'10').subscribe(articles => {
      this.articles = this.articles.concat(articles)
      this.currentPage++;
    })
  }

  onDeleteFavorite(article:Article){
    this.articles.findIndex
  }

}