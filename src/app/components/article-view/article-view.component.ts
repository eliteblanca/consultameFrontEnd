import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import format from 'date-fns/format';
import toDate from 'date-fns/toDate';
import { NgScrollbar } from 'ngx-scrollbar';
import { map, switchMap } from 'rxjs/operators';
import { ArticlesApiService } from "../../api/articles-api.service";
import { Article } from "../../article";
import { UserService } from "../../services/user.service";
import { RTEViewComponent } from "../rteview/rteview.component";
import { googleAnalytics } from "../../services/googleAnalytics.service";
import { StateService } from "../../services/state.service";

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit, AfterViewInit {
  // @ViewChild("content", {static:false}) content: ElementRef;
  @ViewChild(RTEViewComponent, { static: false })
  rteview: RTEViewComponent;

  @ViewChild('content', { static: false })
  newsContainer: ElementRef;

  @ViewChild(NgScrollbar, { static: true })
  scrollbarRef: NgScrollbar;


  constructor(
    public activatedRoute: ActivatedRoute,
    public renderer: Renderer2,
    public articlesApi: ArticlesApiService,
    public UserService: UserService,
    public Location: Location,
    public router: Router,
    public googleAnalytics: googleAnalytics,
    public stateService: StateService
  ) { }

  // private articleUrl:string;
  public article: Article;
  public modificationDate: string;
  public publicationDate: string;
  public isFavoriteHover = false;
  public startTime: Date;
  public finalTime: Date;

  public container: Element;
  public indexElements: Element[];
  public currentScoll: number = 0;

  public modo:'indice'|'tags'|'adjuntos' = 'indice';

  public adjuntosVisibles = false

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    this.sendViewInfo()
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.activatedRoute.params.pipe(
      map(params => params.id),
      switchMap(articleId => {
        return this.articlesApi.getArticle(articleId)
      })
    ).subscribe((article: Article) => {

      this.article = article;
      this.rteview.setContent(JSON.parse(this.article.obj || "[]"))
      this.modificationDate = format(toDate(this.article.modificationDate), 'yyyy/MM/dd  HH:mm');
      this.publicationDate = format(toDate(this.article.publicationDate), 'yyyy/MM/dd  HH:mm');

      this.indexElements = Array.from((this.newsContainer.nativeElement as HTMLElement).querySelectorAll('h1,h2,h3,h4,h5,h6'))

      this.indexElements = this.indexElements.filter(el => el['innerText']['length'] > 1)

      this.container = Array.from((this.newsContainer.nativeElement as HTMLElement).querySelectorAll('.ql-editor'))[0]

      this.scrollbarRef.scrolled.pipe(
        map(event => event.srcElement['scrollTop'])
      ).subscribe(event => {
        this.currentScoll = event
      })

      this.startTime = new Date();

    })
  }

  isFavorite() {
    return this.article.favorites.includes(this.UserService.usuario.sub)
  }

  isLike() {
    return this.article.likes.includes(this.UserService.usuario.sub)
  }

  isDisLike() {
    return this.article.disLikes.includes(this.UserService.usuario.sub)
  }

  addToFavorites() {
    if (this.isFavorite()) {
      this.articlesApi.deleteFavorite(this.article.id).subscribe((result) => {
        this.googleAnalytics.sendEvent(
          'deleteFavorite',
          'interaction',          
          this.stateService.getValueOf('selectedCliente').cliente + '/' + this.stateService.getValueOf('selectedPcrc').pcrc          
        )
        this.article.favorites = this.article.favorites.filter(userId => userId != this.UserService.usuario.sub)
      })
    } else {
      this.articlesApi.postFavorite(this.article.id).subscribe((result) => {
        this.googleAnalytics.sendEvent(
          'addToFavorite',
          'interaction',          
          this.stateService.getValueOf('selectedCliente').cliente + '/' + this.stateService.getValueOf('selectedPcrc').pcrc          
        )
        this.article.favorites.push(this.UserService.usuario.sub)
      })
    }
  }

  favoriteIcon() {
    if (this.isFavorite()) {
      return 'mdi:heart-multiple'
    } else {
      return 'mdi:cards-heart'
    }
  }

  addLike() {
    if (this.isLike()) {
      this.articlesApi.deleteLike(this.article.id).subscribe(() => {
        this.googleAnalytics.sendEvent(
          'deleteLike',
          'interaction',
          this.stateService.getValueOf('selectedCliente').cliente + '/' + this.stateService.getValueOf('selectedPcrc').pcrc          
        )
        this.article.likes = this.article.likes.filter(userId => userId != this.UserService.usuario.sub)
      })
    } else {
      this.articlesApi.postLike(this.article.id).subscribe(() => {
        this.googleAnalytics.sendEvent(
          'addLike',
          'interaction',
          this.stateService.getValueOf('selectedCliente').cliente + '/' + this.stateService.getValueOf('selectedPcrc').pcrc          
        )
        this.article.likes.push(this.UserService.usuario.sub)
      })
    }

    this.article.disLikes = this.article.disLikes.filter(userId => userId != this.UserService.usuario.sub)

  }

  addDisLike() {
    if (this.isDisLike()) {
      this.articlesApi.deleteDisLike(this.article.id).subscribe(() => {
        this.googleAnalytics.sendEvent(
          'deleteDisLike',
          'interaction',
          this.stateService.getValueOf('selectedCliente').cliente + '/' + this.stateService.getValueOf('selectedPcrc').pcrc          
        )
        this.article.disLikes = this.article.disLikes.filter(userId => userId != this.UserService.usuario.sub)
      })
    } else {
      this.articlesApi.postDisLike(this.article.id).subscribe(() => {
        this.googleAnalytics.sendEvent(
          'addDisLike',
          'interaction',
          this.stateService.getValueOf('selectedCliente').cliente + '/' + this.stateService.getValueOf('selectedPcrc').pcrc          
        )
        this.article.disLikes.push(this.UserService.usuario.sub)
      })
    }

    this.article.likes = this.article.likes.filter(userId => userId != this.UserService.usuario.sub)

  }

  goBack() {
    this.Location.back();
  }

  scrollTo(el: Element) {
    // container.scrollTop = nodeList[2]['offsetTop']
    // this.container.scrollTop = el['offsetTop'];
    this.scrollbarRef.scrollTo({ top: el['offsetTop'] })
  }

  calculateActive(index) {
    if (this.indexElements[index + 1]) {
      if (this.indexElements[index]['offsetTop'] - 100 < this.currentScoll && this.indexElements[index + 1]['offsetTop'] - 100 > this.currentScoll) {
        return 'active';
      } else {
        return 'na'
      }
    } else {
      return 'na';
    }
  }

  searchTag(tag) {
    this.router.navigate(['/app/search'], { queryParams: { tag: tag } })
  }

  goToArticleEdition() {
    if(this.article.type == 'news'){
      this.router.navigate(['/app/newseditor', this.article.id ])

    } else {
      this.router.navigate(['/app/articlecreation'], { queryParams: { articleId: this.article.id } })

    }
  }

  sendViewInfo() {
    if (!this.finalTime) {
      this.finalTime = (new Date())
      this.googleAnalytics.sendEvent(
        'lecture',
        'interaction',
        this.stateService.getValueOf('selectedCliente').cliente + '/' + this.stateService.getValueOf('selectedPcrc').pcrc,
        this.finalTime.getTime() - this.startTime.getTime()
      )
      this.articlesApi.postArticleView(this.article.id, this.startTime.getTime(), this.finalTime.getTime())
        .subscribe()
    }
  }

}