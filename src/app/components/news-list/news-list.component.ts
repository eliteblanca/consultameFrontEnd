import { Component, OnInit, Input } from '@angular/core';
import { news } from "../../api/news-api.service";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {


  _news: news[];
  public columns: news[][];
  private columnsCount: number = 3;

  @Input()
  set news(news: news[]) {
    this._news = [];
    this.columns = [];
    for (let i = 0; i < this.columnsCount; i++) {
      this.columns.push([])
    }
    if (typeof news != 'undefined') {
      this._news = news;
      let i = 0;
      let row = 0;
      while (i < this._news.length) {
        for (let k = 0; k < this.columnsCount && i < this._news.length; k++) {
          this.columns[k][row] = this._news[i];
          i++;
        }
        row++;
      }
    } else {

    }
  }

  get news(): news[] {
    return this._news;
  }

  constructor() {
    this.columns = [];
    for (let i = 0; i < this.columnsCount; i++) {
      this.columns.push([])
    }
  }

  ngOnInit() {
  }

}