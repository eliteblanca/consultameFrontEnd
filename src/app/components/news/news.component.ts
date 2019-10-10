import { Component, OnInit } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { news, NewsApiService } from "../../api/news-api.service";
import { EventsService } from "../../services/events.service";


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  selectedSubLine:string = "";
  newsList:news[] = [];
  public maxDate: Date = new Date();
  public minDate: Date = new Date(2019, 9 , 30);


  constructor(
    private eventsService:EventsService,
    private newsApiService:NewsApiService
  ){  }
  
  ngOnInit(){
    return this.eventsService.newSelectedLineSource.pipe(
      filter(selectedLine => selectedLine.line != null && selectedLine.subLine != null),
      switchMap(selectedLine => this.newsApiService.getNews(selectedLine.subLine.id,'published'))
    ).subscribe(newsList => this.newsList = newsList)
  }

  onChange(event){
    console.log(event)
  }
}
