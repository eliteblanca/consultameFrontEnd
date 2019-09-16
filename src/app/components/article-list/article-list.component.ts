import { Component, OnInit, Input } from '@angular/core';
import { Article, articleConf } from "../../article";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  _articles:Article[];
  public columns:Article[][];
  private columnsCount:number = 3;


  @Input()
  set articles(articles: Article[]) {
    this._articles = [];
    this.columns = [];
    for(let i = 0; i<this.columnsCount;i++){
      this.columns.push([])
    }
    console.log(articles);
    if (typeof articles != 'undefined') {
      this._articles = articles;
      let i = 0;
      let row = 0;
      while (i < this._articles.length) {
        for (let k = 0; k < this.columnsCount && i < this._articles.length; k++) {
          this.columns[k][row] = this._articles[i];
          i++;
        }
        row++;
      }
    }else{
      
    }
  }

  get articles():Article[]{
    return this._articles;
  }

  constructor() { 
    this.columns = [];
    for(let i = 0; i<this.columnsCount;i++){
      this.columns.push([])
    }
  }

  ngOnInit() {
  }

}