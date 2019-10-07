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

  newsList:news[] = [];
  @Output() onAddNews = new EventEmitter();


  constructor( private newsApi:NewsApiService ) { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.selectedSubline){
      of(changes.selectedSubline.currentValue).pipe(
        switchMap(selectedSublineId => this.newsApi.getNews(selectedSublineId))
      ).subscribe(news =>{
        this.newsList = news
        console.log(this.newsList)
      })
    }
  }

  @Input() selectedSubline:string;

  ngOnInit() {  }

  addNews(){
    this.onAddNews.next()
  }

  addNewsResponse(news:news){
    console.log(news)
    this.newsList.push(news)
  }

}