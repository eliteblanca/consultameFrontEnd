import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { interval, of } from 'rxjs';
import { concatMap, filter, map, switchMap, throttle } from 'rxjs/operators';
import { ArticlesApiService, postArticleDTO } from "../../api/articles-api.service";
import { Article } from "../../article";
import { RichTextEditorComponent } from "../rich-text-editor/rich-text-editor.component";
import { environment } from '../../../environments/environment';




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
  public newFiles:string[] = [];
  public status = '';


  @ViewChild(RichTextEditorComponent,{ static:false }) RTE:RichTextEditorComponent;
  @ViewChild('articleTitle',{ static:false }) public articleTitle:ElementRef ;

  public articleToEdit:Article;

  public path = {
    saveUrl: ``,
    removeUrl: ``
  };

  ngAfterViewInit(){
    let editArticleObservable = this.route.queryParamMap.pipe(
      filter((params:ParamMap) => params.has('articleId') && !params.has('category') ),
      map((params:ParamMap) => params.get('articleId')),
      switchMap(articleId => this.articlesApi.getArticle(articleId))
    ).subscribe(article => {
      this.articleToEdit = article;

      this.path = {
        saveUrl: `${environment.endpoint}/files/${this.articleToEdit.id}`,
        removeUrl: `${environment.endpoint}/files/${this.articleToEdit.id}/delete`
      };

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
      let newArticle:postArticleDTO = {
        attached:[ ...this.articleToEdit.attached, ...this.newFiles ],
        category:this.articleToEdit.category,
        content:this.RTE.getText(),
        obj:this.RTE.getContent(),
        state:'published',
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
        content: this.RTE.getText(),//! arreglar el contenido 🖐
        obj:this.RTE.getContent(),
        role:"articulo",
        state:'published',
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

  saveAsDraft(){
    if(!!this.articleToEdit){
      let newArticle:postArticleDTO = {
        attached:[ ...this.articleToEdit.attached, ...this.newFiles ],
        category:this.articleToEdit.category,
        content:this.RTE.getText(),
        obj:this.RTE.getContent(),
        role:"articulo",
        state:'archived',
        tags:this.tags,
        title:this.articleTitle.nativeElement.value
      };
  
      of(null).pipe(
        throttle(() => interval(700)),
        concatMap(() => this.articlesApi.updateArticle(this.articleToEdit.id, newArticle).pipe())
      ).subscribe(newArticle => {
        window.alert('Articulo guardado')
      })

    }else if(!!this.seletedCategory){
      let newArticle:postArticleDTO  = {
        attached:[],
        category:this.seletedCategory,
        content: this.RTE.getText(),//! arreglar el contenido 🖐
        obj:this.RTE.getContent(),
        role:"articulo",        
        state:'archived',
        tags:this.tags,
        title:this.articleTitle.nativeElement.value
      };

      of(null).pipe(
        throttle(() => interval(700)),
        concatMap(() => this.articlesApi.postArticle(newArticle))
      ).subscribe(newArticle => {
        this.articleToEdit = newArticle 
        this.router.navigate(['/app/articlecreation'],{ queryParams: { articleId: newArticle.id }})       
        window.alert('Articulo guardado')
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
    this.contentOnEditor = content.content;
    this.textOnEditor = content.text;
  }

  onFileUploaded(filesData){
    if(filesData.operation == "upload"){
      this.articleToEdit.attached.push(filesData.file.name)
      this.saveAsDraft()
      this.status = 'Cargado con exito'
    }
  }

  fileDeleted(fileName){
    this.articleToEdit.attached = this.articleToEdit.attached.filter(file => file != fileName )    
  }

  onFileSelect(event){
    console.log('prueba')
    if(event.filesData.length){
      let duplicateIndex = this.articleToEdit.attached.find(fileName => fileName == event.filesData[0].name )
      if(duplicateIndex){
        event.isCanceled = true;
        this.status = 'archivo duplicado'
      }else{
        this.status = event.filesData[0].name
      }
    }
  }

}