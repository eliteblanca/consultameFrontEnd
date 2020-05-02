import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { news, NewsApiService } from "../../api/news-api.service";
import { StateService } from "../../services/state.service";


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnChanges {

  news: news[] = [];
  private placeholders:any[] = []
  private currentPage = 1;

  @Input()
  date:Date;  
  
  private scrollSubject = new BehaviorSubject(1)
  private scroll$ = this.scrollSubject.asObservable()
  private news$:Observable<news[]>

  masonryOptions:NgxMasonryOptions = {
    gutter: 16
  }

  constructor(
    private newsApiService:NewsApiService,
    private state:StateService
  ) {  }

  ngOnInit() {
    let pcrc$ = this.state.selectedPcrc$.pipe(tap(pcrc => this.news = []))

    this.news$ = merge(this.scroll$,pcrc$).pipe(
      tap(value => this.placeholders = [1,2,3]),
      concatMap(value => 
        this.newsApiService.getNews({
          idSubline:this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString(),
          state:'published',
          from:this.news.length,
          size:6,
          date:this.date.getTime().toString()
        })),
        tap(news => {
          this.news = this.news.concat(news)
          this.placeholders = []
        })
    )

    this.news$.subscribe()

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.date.isFirstChange()){
      this.news = []
      this.scrollSubject.next(1);
    }
  }

  onScroll(event){
    this.scrollSubject.next(1);
  }
}