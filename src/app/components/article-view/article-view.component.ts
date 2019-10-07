import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Article } from "../../article";
import { ApiService } from 'src/app/services';
import { ArticlesApiService } from "../../api/articles-api.service";
import toDate from 'date-fns/toDate'
import format from 'date-fns/format'
import { UserService } from "../../services/user.service";
import { RTEViewComponent } from "../rteview/rteview.component";
import {Location} from '@angular/common';
@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit, AfterViewInit {
  // @ViewChild("content", {static:false}) content: ElementRef;
  @ViewChild(RTEViewComponent, { static: false }) rteview: RTEViewComponent;

  constructor(
     public activatedRoute: ActivatedRoute,
     public renderer:Renderer2,
     public articlesApi:ArticlesApiService,
     public UserService:UserService,
     public Location:Location
  ) { }

  // private articleUrl:string;
  public article:Article;
  public modificationDate:string;
  public publicationDate:string;
  public isFavoriteHover = false;


  ngOnInit(){
  }

  ngAfterViewInit(){
    this.activatedRoute.params.pipe(
        map(params => params.id),
        switchMap(articleId=>{
          return this.articlesApi.getArticle(articleId)
        })
      ).subscribe((article:Article)=>{
      this.article = article;
      this.rteview.setContent(JSON.parse(this.article.obj || "[]")) 
      this.modificationDate = format(toDate(this.article.modificationDate),'yyyy/MM/dd  HH:mm');
      this.publicationDate = format(toDate(this.article.publicationDate),'yyyy/MM/dd  HH:mm');
      // this.createArticle(article.content)
    })
  }

  // createArticle(content){
  //   let iframe = document.createElement('iframe');
  //   iframe.src = this.getGeneratedPageURL({"html":content, css:"",js:"let prueba ="});
  //   iframe.style.border = '0';    
  //   iframe.style.height = '100%';    
  //   iframe.style.width = '100%';    

  //   this.articleUrl = iframe.src;
  //   this.renderer.appendChild(this.content.nativeElement,iframe);
  // }

  // getGeneratedPageURL = ({ html, css, js }) => {
  //   const getBlobURL = (code, type) => {
  //     const blob = new Blob([code], { type })
  //     return URL.createObjectURL(blob)
  //   }

  //   const cssURL = getBlobURL(css, 'text/css')
  //   const jsURL = getBlobURL(js, 'text/javascript')

  //   const source = `
  //     <html>
  //       <head>
  //         <link rel="stylesheet" type="text/css" href="${cssURL}" />
  //         <script  src="https://code.jquery.com/jquery-3.4.1.min.js"  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="  crossorigin="anonymous"></script>
  //         <script src="${jsURL}"></script>
  //       </head>
  //       <body>
  //         ${html || ''}
  //       </body>
  //     </html>
  //   `

  //   return getBlobURL(source, 'text/html')
  // }

  // fullScreen(){
  //   window.open(this.articleUrl, '_blank');
  // }

  isFavorite(){
    return this.article.favorites.includes(this.UserService.usuario.sub)
  }

  isLike(){
    return this.article.likes.includes(this.UserService.usuario.sub)
  }

  isDisLike(){
    return this.article.disLikes.includes(this.UserService.usuario.sub)
  }

  addToFavorites(){
    if(this.isFavorite()){
      this.articlesApi.deleteFavorite(this.article.id).subscribe((result)=>{
        this.article.favorites = this.article.favorites.filter( userId => userId != this.UserService.usuario.sub)
      })
    }else{
      this.articlesApi.postFavorite(this.article.id).subscribe((result)=>{
        this.article.favorites.push(this.UserService.usuario.sub)
      })
    }
  }

  favoriteIcon(){
    if( this.isFavorite() ){
      return 'mdi:heart-multiple'
    }else {
      return 'mdi:cards-heart'
    }
  }

  addLike(){
    if(this.isLike()){      
      this.articlesApi.deleteLike(this.article.id).subscribe(()=>{
        this.article.likes = this.article.likes.filter(userId => userId !=  this.UserService.usuario.sub )
      })
    }else{
      this.articlesApi.postLike(this.article.id).subscribe(()=>{
        this.article.likes.push(this.UserService.usuario.sub)
      })
    }

    this.article.disLikes = this.article.disLikes.filter(userId => userId !=  this.UserService.usuario.sub )

  }

  addDisLike(){
    if(this.isDisLike()){      
      this.articlesApi.deleteDisLike(this.article.id).subscribe(()=>{
        this.article.disLikes = this.article.disLikes.filter(userId => userId !=  this.UserService.usuario.sub )
      })
    }else{
      this.articlesApi.postDisLike(this.article.id).subscribe(()=>{
        this.article.disLikes.push(this.UserService.usuario.sub)
      })
    }

    this.article.likes = this.article.likes.filter(userId => userId !=  this.UserService.usuario.sub )

  }

  goBack(){
    this.Location.back();
  }

}