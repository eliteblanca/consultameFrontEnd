import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import format from 'date-fns/format';
import toDate from 'date-fns/toDate';
import { NgScrollbar } from 'ngx-scrollbar';
import { map, switchMap } from 'rxjs/operators';
import { ArticlesApiService } from "../../api/articles-api.service";
import { Article } from "../../article";
import { UserService } from "../../services/user.service";
import { RTEViewComponent } from "../rteview/rteview.component";


@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit, AfterViewInit {
  // @ViewChild("content", {static:false}) content: ElementRef;
  @ViewChild(RTEViewComponent, { static: false })
  rteview: RTEViewComponent;

  @ViewChild('content', { static: false } ) 
  newsContainer:ElementRef;

  @ViewChild(NgScrollbar, { static: true })
  scrollbarRef: NgScrollbar;


  constructor(
     public activatedRoute: ActivatedRoute,
     public renderer:Renderer2,
     public articlesApi:ArticlesApiService,
     public UserService:UserService,
     public Location:Location,     
    public router: Router
  ) { }

  // private articleUrl:string;
  public article:Article;
  public modificationDate:string;
  public publicationDate:string;
  public isFavoriteHover = false;

  public container:Element;
  public indexElements:Element[];
  public currentScoll:number = 0;

  public adjuntosMode = false;

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
      
      this.indexElements = Array.from((this.newsContainer.nativeElement as HTMLElement).querySelectorAll('h1,h2'))

      this.indexElements = this.indexElements.filter( el => el['innerText']['length'] > 1 )

      this.container = Array.from( (this.newsContainer.nativeElement as HTMLElement).querySelectorAll('.ql-editor'))[0]

      this.scrollbarRef.scrolled.pipe(
        map(event=> event.srcElement['scrollTop'])
      ).subscribe(event=>{
        this.currentScoll = event
      })

    })
  }

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

  scrollTo(el:Element){
    // container.scrollTop = nodeList[2]['offsetTop']
    // this.container.scrollTop = el['offsetTop'];
    this.scrollbarRef.scrollTo({top:el['offsetTop']})
  }

  calculateActive(index){
    if(this.indexElements[index + 1]){
      if( this.indexElements[index]['offsetTop'] - 100 < this.currentScoll && this.indexElements[index + 1]['offsetTop'] - 100 > this.currentScoll  ){
        return 'active';
      }else{
        return 'na'
      }
    }else{
      return 'na';
    }
  }

  searchTag(tag){    
    this.router.navigate(['/app/search'], { queryParams: { tag: tag } })
  }

  goToArticleEdition(){
    this.router.navigate(['/app/articlecreation'],{ queryParams: { articleId: this.article.id }, queryParamsHandling: 'merge' })
  }

}