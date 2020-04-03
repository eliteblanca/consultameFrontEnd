import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NewsApiService, news } from "../../api/news-api.service";
import { switchMap, tap, concatMap } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { StateService } from "../../services/state.service";

@Component({
  selector: 'app-news-list-editable',
  templateUrl: './news-list-editable.component.html',
  styleUrls: ['./news-list-editable.component.css']
})
export class NewsListEditableComponent implements OnInit, OnChanges {

  public newsList: news[] = []
  public newsdraftList: news[] = []
  public currentSearch = ''
  public calendarMode = false
  public selectedDate:Date = new Date()
  public maxDate: Date = new Date()
  private scrollSubject = new BehaviorSubject(1)
  private scroll$ = this.scrollSubject.asObservable()

  @Input() mode: 'archived' | 'published' = 'published';
  // @Input() selectedSubline: string;
  // [selectedSubline]="(state.selectedPcrc$ | async).id_dp_pcrc"

  @Input() isArticleOnEdition: boolean
  @Output() onAddNews = new EventEmitter()
  @Output() onNewsEdit = new EventEmitter()
  @Output() onNewsDeleted = new EventEmitter()

  constructor(
    private newsApi: NewsApiService,
    private state: StateService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {    
    this.newsList = []
    this.scrollSubject.next(1);
  }

  ngOnInit() {
    this.scroll$.pipe(
      tap(value => console.log(this.mode)),
      concatMap(value =>
        this.newsApi.getNews({
          idSubline:this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString(),
          state:this.mode,
          from:0,
          size:20,
          query:this.currentSearch,
          date:this.selectedDate.getTime().toString()
        })
      ),
      tap( news => {
        this.newsList = this.newsList.concat(news)
      })
    ).subscribe()

    this.scrollSubject.next(1);
  }

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
        if (this.mode == 'archived') {
          return this.newsApi.getNews({
            idSubline:this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString(),
            state: 'archived',
            from: this.newsList.length + 1,
            size: 1
          })
        } else {
          return this.newsApi.getNews({
            idSubline:this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString(), 
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
    this.scrollSubject.next(1);
  }

  concatNews(news:news){
    this.newsList.push(news)
  }

  search(text:string){
    this.newsList = [];
    this.currentSearch = text;
    this.scrollSubject.next(1);
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

    this.scrollSubject.next(1);
  }

}