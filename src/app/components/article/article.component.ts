import { AfterViewInit, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services';
import { ArticlesApiService } from "../../api/articles-api.service";
import { Article } from '../../article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, AfterViewInit {

  @Input() Article:Article;

  @Output() onPostLike = new EventEmitter<Article>();
  @Output() onDeleteLike = new EventEmitter<Article>();
  
  @Output() onPostDisLike = new EventEmitter<Article>();
  @Output() onDeleteDisLike = new EventEmitter<Article>();

  @Output() onPostFavorite = new EventEmitter<Article>();
  @Output() onDeleteFavorite = new EventEmitter<Article>();
  @Output() imageLoaded = new EventEmitter<boolean>();

  public listDissmised = true;
  public hasLongList;
  
  constructor(
    private articlesApi:ArticlesApiService,
    public UserService:UserService,
    public router: Router
  ) { }
 
  ngOnInit() {
  }

  public resumen:string[] = [];
  public imageSrc:string;
  public links:{href:string, text:string}[] = [];

  imageLoad(){
    this.imageLoaded.next(true)
  }

  ngAfterViewInit(){
    setTimeout(() => {

      let wordsHiglighted = [];

      if(this.Article.highlight && this.Article.highlight.content){        
        
        let resume = ''

        this.resumen = this.Article.highlight.content.filter(frase => frase)

      }

      if(this.resumen.length == 0){
        this.resumen = this.Article.content.split('.').slice(0,2);
      }

      let articleObj = JSON.parse(this.Article.obj);

      let images = articleObj.ops.filter( (op:{insert:object}) => op.insert['image'] )
      
      if(images.length){
        images = images.map(image => image['insert']['image'])
        this.imageSrc = images[0];
      }

      let links = articleObj.ops.filter( (op:{insert:Object,attributes:Object}) => {
        return op.attributes && op.attributes['link']
      })

      if(links.length){
        links = links.map(link => ({ href:link['attributes']['link'], text:link['insert'] }))
        links = links.slice(0,3);
        this.links = links;
      }
    })
  }

  isFavorite(){
    return this.Article.favorites.includes(this.UserService.usuario.sub)
  }

  isLike(){
    return this.Article.likes.includes(this.UserService.usuario.sub)
  }

  isDisLike(){
    return this.Article.disLikes.includes(this.UserService.usuario.sub)
  }

  addToFavorites(){
    if(this.isFavorite()){
      this.articlesApi.deleteFavorite(this.Article.id).subscribe((result)=>{
        this.Article.favorites = this.Article.favorites.filter( userId => userId != this.UserService.usuario.sub)
        this.onDeleteFavorite.next(this.Article)
      })
    }else{
      this.articlesApi.postFavorite(this.Article.id).subscribe((result)=>{
        this.Article.favorites.push(this.UserService.usuario.sub)
        this.onPostFavorite.next(this.Article)
      })
    }
  }

  addLike(){
    if(this.isLike()){      
      this.articlesApi.deleteLike(this.Article.id).subscribe(()=>{
        this.Article.likes = this.Article.likes.filter(userId => userId !=  this.UserService.usuario.sub )
        this.onDeleteLike.next(this.Article)
      })
    }else{
      this.articlesApi.postLike(this.Article.id).subscribe(()=>{
        this.Article.likes.push(this.UserService.usuario.sub)
        this.onPostLike.next(this.Article)
      })
    }

    this.Article.disLikes = this.Article.disLikes.filter(userId => userId !=  this.UserService.usuario.sub )

  }

  addDisLike(){
    if(this.isDisLike()){
      this.articlesApi.deleteDisLike(this.Article.id).subscribe(()=>{
        this.Article.disLikes = this.Article.disLikes.filter(userId => userId !=  this.UserService.usuario.sub )
        this.onDeleteDisLike.next(this.Article)
      })
    }else{
      this.articlesApi.postDisLike(this.Article.id).subscribe(()=>{
        this.Article.disLikes.push(this.UserService.usuario.sub)
        this.onPostDisLike.next(this.Article)
      })
    }

    this.Article.likes = this.Article.likes.filter(userId => userId !=  this.UserService.usuario.sub )

  }

  searchTag(tag){    
    this.router.navigate(['/app/search'], { queryParams: { tag: tag } })
  }

  goToArticleEdition(){
    if(this.Article.type == 'news'){
      this.router.navigate(['/app/newseditor', this.Article.id ])

    } else {
      this.router.navigate(['/app/articlecreation'], { queryParams: { articleId: this.Article.id } })

    }
  }

}