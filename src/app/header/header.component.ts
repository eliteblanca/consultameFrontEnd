import { Component, OnInit } from '@angular/core';
import { EventsService } from "../services/events.service";
import {BehaviorSubject, Subscription} from 'rxjs';
import { DiccionarioEjemplo } from "../diccionario-ejemplo";
import { Article, articleConf } from "../article";
import { ApiService } from "../services/index";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css','../../../node_modules/ng-masonry-grid/ng-masonry-grid.css']
})
export class HeaderComponent implements OnInit {

  constructor(public api:ApiService) { }

  newSearchSubs:Subscription;

  ngOnInit() {    
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
