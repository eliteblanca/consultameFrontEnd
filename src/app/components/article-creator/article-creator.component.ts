import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-creator',
  templateUrl: './article-creator.component.html',
  styleUrls: ['./article-creator.component.css']
})
export class ArticleCreatorComponent implements OnInit {

  constructor() { }

  public tags:string[] = ["prueba_prueba ","prueba","yoyi"];

  ngOnInit() {
  }
  
  prueba(){
    console.log(history.state.data)
  }

  addTag(tag:string){
    var tagAux = tag.replace(/#/gi,'').replace(/ /gi,'');
    if(!this.tags.includes(tagAux)){
      this.tags.push(tagAux);
    }
  }

  deleteTag(tagToDelete:string){
    this.tags = this.tags.filter(tag => tag != tagToDelete)
  }

}
