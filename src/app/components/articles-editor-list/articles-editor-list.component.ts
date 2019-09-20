import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from "../../article";

@Component({
  selector: 'app-articles-editor-list',
  templateUrl: './articles-editor-list.component.html',
  styleUrls: ['./articles-editor-list.component.css']
})
export class ArticlesEditorListComponent implements OnInit {

  @Input() articles:Article[];
  @Input() categorySelected:string;

  constructor() {  }

  ngOnInit() {

  }

  articuloEliminado(idArticulo:string){
    this.articles = this.articles.filter( article => article.id != idArticulo );
  }
}
