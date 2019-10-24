import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-article-prev',
  templateUrl: './article-prev.component.html',
  styleUrls: ['./article-prev.component.css']
})
export class ArticlePrevComponent implements OnInit {

  constructor() { }

  @Input() fileName:string;
  @Input() articleId:string;

  ngOnInit() {

  }

  getIconName(){
    let ext = this.fileName.split('.')[this.fileName.split('.').length - 1]

    switch (ext) {
      case 'png':
        return 'iwwa:file-png'
        break;
    
      default:
        break;
    }

  }

  getLink = () => `http://localhost:3001/files/${this.articleId}/${this.fileName}`
  

}
