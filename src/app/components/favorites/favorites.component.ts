import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from "../../article";
import { ArticleListComponent } from "../article-list/article-list.component";
import { ArticlesApiService } from "../../api/articles-api.service";
import { of, concat } from 'rxjs';
import { switchAll, switchMap } from 'rxjs/operators';

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
    this.onScroll(null)
  }

  onScroll(event){

    of(null).pipe(
      switchMap(value => {
        let promises = [0,1,2,3,4,5,6,7,8,9].map(number => {
          return this.articlesApi.getSelfFavorites(
            this.articles.length,
            1
          )
        })

        return concat(...promises)

      })
    ).subscribe()

    .subscribe(articles => {
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