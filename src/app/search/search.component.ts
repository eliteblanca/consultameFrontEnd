import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article, articleConf } from "../article";
import { ApiService } from "../api.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public busqueda:string = "";

  constructor(public route:ActivatedRoute,public api:ApiService) {  }

  ngOnInit() {
    this.route.queryParams.pipe(
      switchMap(params=>{
        return this.api.getArticles(params['query'])
      })
    ).subscribe((articles)=>{
      console.log(articles)
    })
  }

}