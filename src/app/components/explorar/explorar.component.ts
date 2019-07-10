import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { Article } from "../../article";
import { ApiService } from "../../services";
@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {

  public articles:Article[];

  constructor(public route:ActivatedRoute, public api:ApiService, public router:Router ) {  }

  ngOnInit() {
    this.route.queryParams.pipe(
      switchMap(params=>{
        if(params['category']){
          return this.api.getArticles(params);
        }else{          
          return this.api.getArticles({category:""});
        }
      })
    ).subscribe(articles=>{
      this.articles = articles;
    });    
    
    this.route.queryParamMap.subscribe(params=>{
      if(!params.has("line")){
        console.log(params);
        this.router.navigate(
          [],{
            relativeTo: this.route,
            queryParams: {line:'line'}, 
            queryParamsHandling: "merge",
          });
      }
    })
  }



}