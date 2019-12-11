import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NewsApiService, news } from "../../api/news-api.service";
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-news-list-editable',
  templateUrl: './news-list-editable.component.html',
  styleUrls: ['./news-list-editable.component.css']
})
export class NewsListEditableComponent implements OnInit, OnChanges {

  public newsList: news[] = [];
  public newsdraftList: news[] = [];
  public currentSearch = '';
  public calendarMode = false;
  public selectedDate:Date = new Date();
  public maxDate: Date = new Date();

  @Input() mode: 'news' | 'draft' = 'news';
  @Input() selectedSubline: string;
  @Input() isArticleOnEdition: boolean;
  @Output() onAddNews = new EventEmitter();
  @Output() onNewsEdit = new EventEmitter();
  @Output() onNewsDeleted = new EventEmitter();

  constructor(private newsApi: NewsApiService) { }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.selectedSubline && changes.mode) {

      of(changes.selectedSubline.currentValue).pipe(
        switchMap(selectedSublineId => {
          if (changes.mode.currentValue == 'news') {            
            return this.newsApi.getNews({
              idSubline:selectedSublineId,
              state:'published',
              from:0,
              size:20
            })
          } else {
            return this.newsApi.getNews({
              idSubline:selectedSublineId,
              state:'archived',
              from:0,
              size:20
            })
          }
        })
      ).subscribe(news => {
        this.newsList = news
      })
    } else if (changes.selectedSubline && this.mode == 'draft') {

      of(changes.selectedSubline.currentValue).pipe(
        switchMap(selectedSublineId => this.newsApi.getNews({ 
          idSubline: selectedSublineId,
          state:'archived',
          from:0,
          size:20
        }))
      ).subscribe(news => {
        this.newsList = news
      })
    } else if (changes.selectedSubline && this.mode == 'news') {      

      of(changes.selectedSubline.currentValue).pipe(
        switchMap(selectedSublineId => this.newsApi.getNews({
          idSubline:selectedSublineId,
          state:'published',
          from:0,
          size:20
        }))
      ).subscribe(news => {
        this.newsList = news
      })
    } else if (changes.mode && changes.mode.currentValue == 'news') {

      of(this.selectedSubline).pipe(
        switchMap(selectedSublineId => this.newsApi.getNews({
          idSubline:selectedSublineId,
          state:'published',
          from: 0,
          size: 20
        }))
      ).subscribe(news => {
        this.newsList = news
      })
    } else if (changes.mode && changes.mode.currentValue == 'draft') {

      of(this.selectedSubline).pipe(
        switchMap(selectedSublineId => this.newsApi.getNews({
          idSubline:selectedSublineId,
          state:'archived',
          from: 0,
          size: 20
        }))
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
    this.newsApi.deleteNews(newsId).pipe(
      tap(result => this.newsList = this.newsList.filter(news => news.id != newsId)),
      switchMap(result => {
        if (this.mode == 'draft') {
          return this.newsApi.getNews({
            idSubline:this.selectedSubline,
            state: 'archived',
            from: this.newsList.length + 1,
            size: 1
          })
        } else {
          return this.newsApi.getNews({
            idSubline:this.selectedSubline, 
            state:'published', 
            from:this.newsList.length + 1, 
            size: 1
          })
        }
      })
    ).subscribe(news => {
      this.newsList = this.newsList.concat(news)
      this.onNewsDeleted.next(newsId)
    })
  }

  onScroll(event) {
    if (this.mode == 'draft') {

      if(!!this.currentSearch.length){
        this.newsApi.getNews({
          idSubline:this.selectedSubline, 
          state:'archived', 
          from:this.newsList.length, 
          size:20,
          query:this.currentSearch,
          date:this.selectedDate.getTime().toString()
        }).subscribe(news => {
          this.newsList = this.newsList.concat(news)        
        })

      } else {
        this.newsApi.getNews({
          idSubline:this.selectedSubline, 
          state:'archived', 
          from:this.newsList.length, 
          size:20,          
          date:this.selectedDate.getTime().toString()
        }).subscribe(news => {
          this.newsList = this.newsList.concat(news)        
        })
      }

    } else {

      if(!!this.currentSearch.length){
        this.newsApi.getNews({
          idSubline:this.selectedSubline, 
          state:'published', 
          from:this.newsList.length, 
          size:20,
          query:this.currentSearch,          
          date:this.selectedDate.getTime().toString()
        }).subscribe(news => {
          this.newsList = this.newsList.concat(news)
        })
        
      } else {
          this.newsApi.getNews({
            idSubline:this.selectedSubline, 
            state:'published', 
            from:this.newsList.length, 
            size:20,            
            date:this.selectedDate.getTime().toString()
          }).subscribe(news => {
            this.newsList = this.newsList.concat(news)
          })

      }
    }
  }

  concatNews(news:news){
    this.newsList.push(news)
  }

  search(text:string){
    this.newsList = [];
    this.currentSearch = text;
    this.onScroll(null)
  }

  showCalendar(){
    this.calendarMode = !this.calendarMode;
  }

  filtrarPorFecha(event){    
    this.newsList = [];

    if(event.value.getDate() == new Date().getDate() && event.value.getFullYear() == new Date().getFullYear() && event.value.getMonth() == new Date().getMonth()){
      this.selectedDate = new Date()
    } else {
      this.selectedDate = event.value
      this.selectedDate.setHours(23)
    }

    this.calendarMode = false;

    this.onScroll(null)
  }

}