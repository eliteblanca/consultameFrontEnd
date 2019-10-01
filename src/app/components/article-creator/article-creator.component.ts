import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArticlesApiService, postArticleDTO } from "../../api/articles-api.service";
import { Article } from "../../article";
import { RichTextEditorComponent } from "../rich-text-editor/rich-text-editor.component";

import { of, timer, interval } from 'rxjs';
import { exhaustMap, concatMap, startWith, throttle, switchMap, filter, map, tap } from 'rxjs/operators';
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
  private contentOnEditor:Object[];
  private textOnEditor:string;

  @ViewChild(RichTextEditorComponent,{ static:false }) RTE:RichTextEditorComponent;
  @ViewChild('articleTitle',{ static:false }) public articleTitle:ElementRef ;
  public articleToEdit:Article;

  ngAfterViewInit(){
    let editArticleObservable = this.route.queryParamMap.pipe(
      filter((params:ParamMap) => params.has('articleId') && !params.has('category') ),
      map((params:ParamMap) => params.get('articleId')),
      switchMap(articleId => this.articlesApi.getArticle(articleId))
    ).subscribe(article => {
      this.articleToEdit = article;
      this.articleTitle.nativeElement.value = this.articleToEdit.title;
      this.tags = this.articleToEdit.tags;    
      this.RTE.setContent( JSON.parse((this.articleToEdit.obj || "[]")) )
    })
  
    let newArticleObservable = this.route.queryParamMap.pipe(
      filter((params:ParamMap) => !params.has('articleId') && params.has('category') ),
      map((params:ParamMap) => params.get('category'))
    ).subscribe(category => {
      this.seletedCategory = category
    })
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
        content:this.textOnEditor,
        obj:JSON.stringify(this.contentOnEditor),
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
        content: this.textOnEditor,//! arreglar el contenido 🖐
        obj:JSON.stringify(this.contentOnEditor),
        role:"articulo",
        tags:this.tags,
        title:this.articleTitle.nativeElement.value
      };

      of(null).pipe(
        throttle(() => interval(700)),
        concatMap(() => this.articlesApi.postArticle(newArticle))
      ).subscribe(newArticle => {
        this.goToArticle(newArticle.id)
      })
    }
  }

  goToArticle(articleId:string){
    this.router.navigate(['/app/articles/' + articleId],{ queryParamsHandling: 'merge' })
  }

  getArticleId(){
    if(this.articleToEdit){
      return this.articleToEdit.id;
    }else{
      return ''
    }
  }

  contentOnEditorChange(content){
    console.log(content)
    this.contentOnEditor = content.content;
    this.textOnEditor = content.text;
  }
}