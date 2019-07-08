import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from "../services/index";
import { switchMap } from "rxjs/operators";
import { Article, articleConf } from "../article";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit  {

  public busqueda:string = "";
  public articles:Article[];

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
}