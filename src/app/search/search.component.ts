import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
import { switchMap } from "rxjs/operators";
import { Article, articleConf } from "../article";
import { Masonry, MasonryGridItem } from 'ng-masonry-grid';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit  {

  public busqueda:string = "";
  public articles:Article[];
  _masonry: Masonry;

  constructor(public route:ActivatedRoute,public api:ApiService) {  }

  ngOnInit() {
    this.route.queryParams.pipe(
      switchMap(params=>{
        return this.api.getArticles(params['query'])
      })
    ).subscribe((articles)=>{
      this.articles = articles;
    })
  }

  ngAfterViewInit(){
    //setTimeout(()=>this._masonry.reOrderItems(),1000);    
  }


  onNgMasonryInit($event: Masonry) {
    this._masonry = $event;    
  }

}