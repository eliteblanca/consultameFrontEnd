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

  constructor(private newsApi: NewsApiService) { }

  ngOnChanges(changes: SimpleChanges) {

    console.log(changes)

    if (changes.selectedSubline && changes.mode) {
      of(changes.selectedSubline.currentValue).pipe(
        switchMap(selectedSublineId => {
          if (changes.mode.currentValue == 'news') {
            return this.newsApi.getNews(selectedSublineId, 'published')
          } else {
            return this.newsApi.getNews(selectedSublineId, 'archived')
          }
        })
      ).subscribe(news => {
        this.newsList = news
      })
    } else if (changes.selectedSubline && this.mode == 'draft') {
      of(changes.selectedSubline.currentValue).pipe(
        switchMap(selectedSublineId => this.newsApi.getNews(selectedSublineId, 'archived'))
      ).subscribe(news => {
        this.newsList = news
      })
    } else if (changes.selectedSubline && this.mode == 'news') {
      of(changes.selectedSubline.currentValue).pipe(
        switchMap(selectedSublineId => this.newsApi.getNews(selectedSublineId, 'published'))
      ).subscribe(news => {
        this.newsList = news
      })
    } else if (changes.mode && changes.mode.currentValue == 'news') {
      of(this.selectedSubline).pipe(
        switchMap(selectedSublineId => this.newsApi.getNews(selectedSublineId, 'published'))
      ).subscribe(news => {
        this.newsList = news
      })
    } else if (changes.mode && changes.mode.currentValue == 'draft') {
      of(this.selectedSubline).pipe(
        switchMap(selectedSublineId => this.newsApi.getNews(selectedSublineId, 'archived'))
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

  addAsDraftResponse(news: news) {
    this.newsdraftList.push(news)
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

}