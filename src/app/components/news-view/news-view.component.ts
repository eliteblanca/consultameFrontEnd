import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { RTEViewComponent } from "../rteview/rteview.component";
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NewsApiService, news } from "../../api/news-api.service";
import {Location} from '@angular/common';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.css']
})
export class NewsViewComponent implements OnInit, AfterViewInit {
  
  @ViewChild(RTEViewComponent, { static: false }) rteview: RTEViewComponent;
  currentNews:news;

  @ViewChild('news', { static: false } ) 
  newsContainer:ElementRef;

  container:Element;
  indexElements:Element[];
  currentScoll:number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private NewsApiService:NewsApiService,
    private Location:Location
  ) { }
  
  ngOnInit() {  }
  
  ngAfterViewInit() {
    this.activatedRoute.params.pipe(
      map(params => params.id),
      switchMap(id => this.NewsApiService.getSingleNews(id))
    ).subscribe( news => {
      this.currentNews = news;
      this.rteview.setContent( JSON.parse(news.obj));
      this.indexElements = Array.from((this.newsContainer.nativeElement as HTMLElement).querySelectorAll('h1,h2'))

      this.indexElements = this.indexElements.filter( el => el['innerText']['length'] > 1 )

      this.container = Array.from( (this.newsContainer.nativeElement as HTMLElement).querySelectorAll('.ql-editor'))[0]

      fromEvent(this.container, 'scroll').pipe(
        map(event=> event.srcElement['scrollTop'])
      ).subscribe(event=>{
        this.currentScoll = event
      })
    })
  }
  
  goBack(){
    this.Location.back();
  }
  
  scrollTo(el:Element){
    // container.scrollTop = nodeList[2]['offsetTop']
    this.container.scrollTop = el['offsetTop'];
  }

  calculateActive(index){
    if(this.indexElements[index + 1]){
      if( this.indexElements[index]['offsetTop'] - 100 < this.currentScoll && this.indexElements[index + 1]['offsetTop'] - 100 > this.currentScoll  ){
        return 'active';
      }else{
        return 'na'
      }
    }else{
      return 'na';
    }
  }
}