import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article, articleConf } from "../article";
import { ApiService } from "../api.service";
import { switchMap } from "rxjs/operators";
import { DiccionarioEjemplo } from "../diccionario-ejemplo";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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

  populateArticles():void{
    let diccionario = new DiccionarioEjemplo()
    let newArticles:Article[] = [];
    for(var i = 0; i<5; i++){
      let newOne = new Article({content:diccionario.diccionarioArticles[i],title:"Articulo 1"});
      newArticles.push(newOne);
    }
    
    this.api.postArticles(newArticles).subscribe(val=>{
      console.log("articulos guardados");
    })
  }

}

