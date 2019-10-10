import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';
import { ArticlesApiService } from "../../api/articles-api.service";
import { Article } from '../../article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, AfterViewInit {

  @Input() Article:Article;
  public listDissmised = true;
  public hasLongList;
  
  constructor(
    private articlesApi:ArticlesApiService,
    public UserService:UserService
  ) { }
 
  ngOnInit() {
  }

  public resumen:string[] = [];
  public imageSrc:string;
  public links:{href:string, text:string}[] = [];

  ngAfterViewInit(){
    setTimeout(() => {

      let wordsHiglighted = [];

      if(this.Article.highlight){

        for(var i = 0; i < this.Article.highlight.content.length ; i++){
          wordsHiglighted.push(this.Article.highlight.content[i].match(/<em>[a-zA-Z1-9áéíóú]*<\/em>/gm))
        }

        wordsHiglighted = wordsHiglighted.reduce((prev,current)=> [...prev,...current] ,[])

        let wordsToReplace = wordsHiglighted.map(word => word.replace('<em>','').replace('</em>',''))

        let resume = this.Article.content.split('.')

        resume = resume.filter(frase => {
          let alguna = wordsToReplace.some(word => {
            let incluida = frase.includes(' ' + word + ' ')
            return incluida
          })

          return alguna
        })
        
        this.resumen = resume.map(frase => {
          let nuevaFrase = frase;
          wordsToReplace.forEach((word, index) =>{ nuevaFrase = nuevaFrase.replace(' ' + word + ' ',' ' + wordsHiglighted[index] + ' ') })
          return nuevaFrase
        }).slice(0,5);
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
      })
    }else{
      this.articlesApi.postFavorite(this.Article.id).subscribe((result)=>{
        this.Article.favorites.push(this.UserService.usuario.sub)
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
      this.articlesApi.deleteLike(this.Article.id).subscribe(()=>{
        this.Article.likes = this.Article.likes.filter(userId => userId !=  this.UserService.usuario.sub )
      })
    }else{
      this.articlesApi.postLike(this.Article.id).subscribe(()=>{
        this.Article.likes.push(this.UserService.usuario.sub)
      })
    }

    this.Article.disLikes = this.Article.disLikes.filter(userId => userId !=  this.UserService.usuario.sub )

  }

  addDisLike(){
    if(this.isDisLike()){      
      this.articlesApi.deleteDisLike(this.Article.id).subscribe(()=>{
        this.Article.disLikes = this.Article.disLikes.filter(userId => userId !=  this.UserService.usuario.sub )
      })
    }else{
      this.articlesApi.postDisLike(this.Article.id).subscribe(()=>{
        this.Article.disLikes.push(this.UserService.usuario.sub)
      })
    }

    this.Article.likes = this.Article.likes.filter(userId => userId !=  this.UserService.usuario.sub )

  }


}