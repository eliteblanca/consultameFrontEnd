import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Article } from "../../article";
import { ApiService } from 'src/app/services';
import toDate from 'date-fns/toDate'
import format from 'date-fns/format'
import { UserService } from "../../services/user.service";
import { RTEViewComponent } from "../rteview/rteview.component";

const cssDefault = `html{color:#222;font-size:16px;line-height:1.4;background-color:#fdfdfd;padding:1rem}::-moz-selection{background:#b3d4fc;text-shadow:none}::selection{background:#b3d4fc;text-shadow:none}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}audio,canvas,iframe,img,svg,video{vertical-align:middle}fieldset{border:0;margin:0;padding:0}textarea{resize:vertical}.browserupgrade{margin:.2em 0;background:#ccc;color:#000;padding:.2em 0}*,::after,::before{box-sizing:border-box!important}font{color:var(--primaryText)!important;font:16px/1.4 'Segoe UI',Tahoma,Geneva,Verdana,sans-serif!important}html{line-height:1.15;height:100%;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;padding:1rem}body{margin:0;height:100%;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font:1em monospace,monospace}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline}b,strong{font-weight:bolder}code,kbd,samp{font:1em monospace,monospace}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{margin:0;font:100%/1.15 inherit}button,input{overflow:visible}button,select{text-transform:none}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{outline-offset:-2px}::-webkit-file-upload-button{font:;font-style:normal;font-variant:normal;font-weight:normal;font-family:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}`;

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
     public api:ApiService,
     public UserService:UserService
     
  ) { }

  // private articleUrl:string;
  public article:Article;
  public modificationDate:string;
  public publicationDate:string;

  ngOnInit(){
  }

  ngAfterViewInit(){
    this.activatedRoute.params.pipe(
        map(params => params.id),
        switchMap(articleId=>{
          return this.api.getArticle(articleId)
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

}