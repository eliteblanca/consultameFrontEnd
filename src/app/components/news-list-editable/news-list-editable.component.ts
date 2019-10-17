import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NewsApiService, news } from "../../api/news-api.service";
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-news-list-editable',
  templateUrl: './news-list-editable.component.html',
  styleUrls: ['./news-list-editable.component.css']
})
export class NewsListEditableComponent implements OnInit, OnChanges {

  newsList: news[] = [];
  newsdraftList: news[] = [];

  @Input() mode: 'news' | 'draft' = 'news';
  @Input() selectedSubline: string;
  @Input() isArticleOnEdition: boolean;
  @Output() onAddNews = new EventEmitter();
  @Output() onNewsEdit = new EventEmitter();
  @Output() onNewsDeleted = new EventEmitter();
  private currentPage = 1; 

  constructor(private newsApi: NewsApiService) { }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.selectedSubline && changes.mode) {

      this.currentPage = 1;

      of(changes.selectedSubline.currentValue).pipe(
        switchMap(selectedSublineId => {
          if (changes.mode.currentValue == 'news') {
            console.log('prueba 2')
            return this.newsApi.getNews(selectedSublineId, 'published', '0','20')
          } else {
            return this.newsApi.getNews(selectedSublineId, 'archived', '0','20')
          }
        })
      ).subscribe(news => {
        this.newsList = news
      })
    } else if (changes.selectedSubline && this.mode == 'draft') {

      this.currentPage = 1;

      of(changes.selectedSubline.currentValue).pipe(
        switchMap(selectedSublineId => this.newsApi.getNews(selectedSublineId, 'archived', '0','20'))
      ).subscribe(news => {
        this.newsList = news
      })
    } else if (changes.selectedSubline && this.mode == 'news') {

      this.currentPage = 1;

      of(changes.selectedSubline.currentValue).pipe(
        switchMap(selectedSublineId => this.newsApi.getNews(selectedSublineId, 'published', '0','20'))
      ).subscribe(news => {
        this.newsList = news
      })
    } else if (changes.mode && changes.mode.currentValue == 'news') {

      this.currentPage = 1;

      of(this.selectedSubline).pipe(
        switchMap(selectedSublineId => this.newsApi.getNews(selectedSublineId, 'published', '0','20'))
      ).subscribe(news => {
        this.newsList = news
      })
    } else if (changes.mode && changes.mode.currentValue == 'draft') {

      this.currentPage = 1;

      of(this.selectedSubline).pipe(
        switchMap(selectedSublineId => this.newsApi.getNews(selectedSublineId, 'archived', '0','20'))
      ).subscribe(news => {
        this.newsList = news
      })
    }
  }

  ngOnInit() { }

  addNews() {
    this.onAddNews.next()
  }

  addNewsResponse(news: news) {
    this.newsList.push(news)
  }

  editNews(newsId: string) {
    this.onNewsEdit.next(newsId)
  }

  deleteNews(newsId: string) {
    this.newsApi.deleteNews(newsId).subscribe(result => {
      this.newsList = this.newsList.filter(news => news.id != newsId)
      this.onNewsDeleted.next(newsId)
    })
  }

  onScroll(){

    console.log(this.newsList )

    if(this.mode == 'draft'){
      this.newsApi.getNews(this.selectedSubline, 'archived', (this.currentPage*20).toString(), '20').subscribe(news => {
        this.newsList = this.newsList.concat(news)
        this.currentPage++;
      })
    }else{
      this.newsApi.getNews(this.selectedSubline, 'published', (this.currentPage*20).toString(), '20').subscribe(news => {
        this.newsList = this.newsList.concat(news)
        this.currentPage++;
      })
    }
  }

}