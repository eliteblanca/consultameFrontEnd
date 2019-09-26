import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RichTextEditorComponent } from "../rich-text-editor/rich-text-editor.component";
import { ArticlesApiService, postArticleDTO } from "../../api/articles-api.service";
import { Article } from "../../article";

import { of, timer, interval } from 'rxjs';
import { exhaustMap, concatMap, startWith, throttle, switchMap, filter, map } from 'rxjs/operators';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-article-creator',
  templateUrl: './article-creator.component.html',
  styleUrls: ['./article-creator.component.css']
})
export class ArticleCreatorComponent implements OnInit {

  constructor(
    private articlesApi:ArticlesApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public tags:string[] = [];
  private seletedCategory:string;

  @ViewChild(RichTextEditorComponent,{static: false}) richTextEditor:RichTextEditorComponent ;
  @ViewChild('articleTitle',{ static:false }) public articleTitle:ElementRef ;
  public articleToEdit:Article;

  ngAfterViewInit(){
    let editArticleObservable = this.route.queryParamMap.pipe(
      filter((params:ParamMap) => params.has('articleId') ),
      map((params:ParamMap) => params.get('articleId')),
      switchMap(articleId => this.articlesApi.getArticle(articleId))
    ).subscribe(article => {
      this.articleToEdit = article;
      this.articleTitle.nativeElement.value = this.articleToEdit.title;
      this.tags = this.articleToEdit.tags;
      this.richTextEditor.setContent(this.articleToEdit.content)
    })
  
    let newArticleObservable = this.route.queryParamMap.pipe(
      filter((params:ParamMap) => !params.has('articleId') && !params.has('category') ),
      map((params:ParamMap) => params.get('category'))
    ).subscribe(category => { this.seletedCategory = category })    
  }
  
  ngOnInit() {
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

  saveArticle(){

    if(!!this.articleToEdit){
      let newArticle:postArticleDTO  = {
        attached:[],
        category:this.articleToEdit.category,
        content:this.richTextEditor.getHTML(),
        role:"articulo",
        tags:this.tags,
        title:this.articleTitle.nativeElement.value
      };
  
      of(null).pipe(
        throttle(() => interval(700)),
        concatMap(() => this.articlesApi.updateArticle(this.articleToEdit.id, newArticle).pipe())
      ).subscribe(newArticle => {
        this.goToArticle(this.articleToEdit.id)
      })

    }else if(!!this.seletedCategory){
      let newArticle:postArticleDTO  = {
        attached:[],
        category:this.seletedCategory,
        content:this.richTextEditor.getHTML(),
        role:"articulo",
        tags:this.tags,
        title:this.articleTitle.nativeElement.value
      };

      of(null).pipe(
        throttle(() => interval(700)),
        concatMap(() => this.articlesApi.postArticle(newArticle).pipe())
      ).subscribe(newArticle => {
        this.goToArticle(newArticle.id)
      })
    }
  }

  goToArticle(articleId:string){
    this.router.navigate(['/app/articles/' + articleId],{ queryParamsHandling: 'merge' })
  }
}