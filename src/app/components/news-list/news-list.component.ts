import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { news,NewsApiService } from "../../api/news-api.service";
import { EventsService } from "../../services/events.service";
import { filter, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnChanges {

  _news: news[];

  private currentPage = 1;

  @Input()
  date:Date;

  @Input()
  set news(news: news[]) {
    this._news = news;
  }

  get news(): news[] {
    return this._news;
  }

  constructor(
    private eventsService:EventsService,
    private newsApiService:NewsApiService
  ) {  }

  ngOnInit() {
    this.eventsService.newSelectedLineSource.pipe(
      filter( selectedLine => selectedLine.line != null && selectedLine.subLine != null ),
      map( selectedSubline => selectedSubline.subLine.id ),
      switchMap( selectedSublineId => this.newsApiService.getNews( selectedSublineId,'published','0','20', new Date().getTime().toString() ) )
    ).subscribe( news => {
      this._news = news
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.date.isFirstChange()){
      if( changes.date.currentValue.getDate() == new Date().getDate() && changes.date.currentValue.getFullYear() == new Date().getFullYear() && changes.date.currentValue.getMonth() == new Date().getMonth()  ){
        this.newsApiService.getNews( this.eventsService.newSelectedLineSource.getValue().subLine.id ,'published','0','20', new Date().getTime().toString() ).subscribe(news => {
          this._news = news
        })
      }else{
        this.newsApiService.getNews( this.eventsService.newSelectedLineSource.getValue().subLine.id ,'published','0','20', changes.date.currentValue.getTime().toString() ).subscribe(news => {
          this._news = news
        })
      }
    }
  }

  onScroll(event){
    if(!!!this.date){
      this.date = new Date()
    }

    this.newsApiService.getNews(
       this.eventsService.newSelectedLineSource.getValue().subLine.id,
       'published',
       (this.currentPage*20).toString(),
       '20',
       this.date.getTime().toString()
    ).subscribe(news => {
      this._news = this._news.concat(news)
      this.currentPage++;
    })
  }
}