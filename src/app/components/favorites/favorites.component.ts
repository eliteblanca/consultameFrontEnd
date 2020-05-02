import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from "../../article";
import { ArticleListComponent } from "../article-list/article-list.component";
import { ArticlesApiService } from "../../api/articles-api.service";
import { of, concat, BehaviorSubject } from 'rxjs';
import { switchMap, tap, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  
  public articles: Article[] = [];
  private placeholders:any[]
  private scrollSubject = new BehaviorSubject(1)
  private scroll$ = this.scrollSubject.asObservable()

  @ViewChild(ArticleListComponent, { static: false })
  articleList: ArticleListComponent;

  constructor(
    private articlesApi:ArticlesApiService
  ) {  }

  ngOnInit() {    

    this.scroll$.pipe(
      tap(value => this.placeholders = [1,2,3]),
      concatMap(value => this.articlesApi.getSelfFavorites(
        this.articles.length,
        6   
      )),
      tap(articles => {
        this.articles = this.articles.concat(articles)
        this.placeholders = []
      })
    ).subscribe()

  }

  onScroll(event){
    this.scrollSubject.next(1)
  }

  onDeleteFavorite(article:Article){
    this.articles = this.articles.filter( _article => _article.id != article.id)
    this.articlesApi.getSelfFavorites(this.articles.length + 1 , 1).subscribe(articles => {
      this.articles = this.articles.concat(articles)
    })
  }

}