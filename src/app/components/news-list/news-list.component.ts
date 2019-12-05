import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { news,NewsApiService } from "../../api/news-api.service";
import { EventsService } from "../../services/events.service";
import { filter, switchMap, map, tap } from 'rxjs/operators';
import { StateService } from "../../services/state.service";


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
    private newsApiService:NewsApiService,
    private state:StateService
  ) {  }

  ngOnInit() {
    this.state.selectedPcrc$.pipe(
      switchMap(({id_dp_pcrc}) => this.newsApiService.getNews( {
        idSubline:id_dp_pcrc.toString(),
        state:'published',
        from:0,
        size:20,
        date:new Date().getTime().toString()
      }))
    ).subscribe( news => {
      this._news = news
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.date.isFirstChange()){
      if( changes.date.currentValue.getDate() == new Date().getDate() && changes.date.currentValue.getFullYear() == new Date().getFullYear() && changes.date.currentValue.getMonth() == new Date().getMonth()  ){
        this.state.selectedPcrc$.pipe(
          switchMap( ({id_dp_pcrc}) => this.newsApiService.getNews( {
            idSubline:id_dp_pcrc.toString(),
            state:'published',
            from:0,
            size:20, 
            date:new Date().getTime().toString() 
          }) ),
          tap(news => {
            this._news = news
          })
        ).subscribe()
        
      } else {
          this.state.selectedPcrc$.pipe(
            switchMap( ({id_dp_pcrc}) => this.newsApiService.getNews({
              idSubline:id_dp_pcrc.toString(),
              state:'published',
              from:0,
              size:20,
              date: changes.date.currentValue.getTime().toString()
            }) ),
            tap(news => {
              this._news = news
            })
          ).subscribe()

      }
    }
  }

  onScroll(event){
    if(!!!this.date){
      this.date = new Date()
    }

    this.state.selectedPcrc$.pipe(
      switchMap( ({id_dp_pcrc}) =>
        this.newsApiService.getNews({
            idSubline:id_dp_pcrc.toString(),
            state:'published',
            from:this.currentPage*20,
            size:20,
            date:this.date.getTime().toString()
        })
      ),
      tap(news => {
        this._news = this._news.concat(news)
        this.currentPage++;
      })
    )

  }
}