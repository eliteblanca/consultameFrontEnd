import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { EventsService } from "../../services/events.service";
import { filter, switchMap, tap, map } from 'rxjs/operators';
import { NewsApiService, news, newsDTO, UpdateNewsDTO } from "../../api/news-api.service";
import { RichTextEditorComponent } from "../rich-text-editor/rich-text-editor.component";
import { NewsListEditableComponent } from "../news-list-editable/news-list-editable.component";
import { of, fromEvent, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StateService } from "../../services/state.service";
import { cliente } from "../../api/pcrc-api.service";

@Component({
  selector: 'app-news-creator',
  templateUrl: './news-creator.component.html',
  styleUrls: ['./news-creator.component.css']
})
export class NewsCreatorComponent implements OnInit, AfterViewInit {

  @ViewChild(RichTextEditorComponent, { static: false })
  RTE: RichTextEditorComponent

  @ViewChild(NewsListEditableComponent, { static: false })
  newslist: NewsListEditableComponent

  @ViewChild('articleTitle', { static: false })
  articleTitle: ElementRef

  @ViewChild('saveAsDraftButton', { read: ElementRef, static: false })
  saveAsDraftButton: ElementRef

  @ViewChild('publishNewsButton', { read: ElementRef, static: false })
  publishNewsButton: ElementRef

  newsOnEdition: news;
  listMode: 'news' | 'draft' = 'news';

  postDraftDTO$: Observable<newsDTO>;

  postDraft$: Observable<news>;

  updateDraft$: Observable<{ status: string; }>;

  updateNews$: Observable<any>;

  postNews$: Observable<news>;

  postNewsSpinner = false;

  saveDraftNewsSpinner = false;

  sinContenidoModalOpen = false;

  constructor(
    private newsApi: NewsApiService,
    private router: Router,
    public state: StateService,
  ) { }

  ngOnInit() { }

  ngAfterViewInit(): void {  }

  addNewsMode = false;

  onAddNews() {
    this.addNewsMode = false;

    this.RTE.setContent({})
    this.articleTitle.nativeElement.value = ''
    this.newsOnEdition = undefined;
  }

  onNewsEdit(newsId: string) {
    this.addNewsMode = true;
    of(null).pipe(
      switchMap(result => this.newsApi.getSingleNews(newsId))
    ).subscribe(news => {
      this.RTE.setContent(JSON.parse(news.obj))
      this.articleTitle.nativeElement.value = news.title
      this.newsOnEdition = news;
    })
  }

  onNewsDeleted(newsId: string) {
    if (this.newsOnEdition && this.newsOnEdition.id == newsId) {
      this.RTE.setContent({})
      this.articleTitle.nativeElement.value = '';
      this.newsOnEdition = undefined;
    }
  }

  saveAsDraft = () => {
    let newsToSave = {
      attached: [],
      content: this.RTE.getText(),
      obj: this.RTE.getContent(),
      state: 'archived',
      subline: this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString(),
      title: this.articleTitle.nativeElement.value
    }

    this.saveDraftNewsSpinner = true;

    if (this.RTE.getContent().length > 24 && this.articleTitle.nativeElement.value.length > 0) {
      if (!!!this.newsOnEdition) {

        this.newsApi.postNews(newsToSave).pipe(
          tap(newsAdded => {
            this.newsOnEdition = newsAdded;
            this.listMode = 'draft';
            this.saveDraftNewsSpinner = false;
            this.newslist.concatNews(newsAdded)
          })
        ).subscribe()

      } else {
        this.newsApi.updateNews(this.newsOnEdition.id, newsToSave).pipe(
          tap(result => {
            this.saveDraftNewsSpinner = false;
          })
        ).subscribe()
      }
    } else {
      this.saveDraftNewsSpinner = false;
      this.sinContenidoModalOpen = true;
    }

  }

  publishNews = () => {

    this.postNewsSpinner = true;

    if (this.RTE.getContent().length > 24 && this.articleTitle.nativeElement.value.length > 0) {

      if(!!!this.newsOnEdition){
  
        let newsToSave = {
          attached: [],
          content: this.RTE.getText(),
          obj: this.RTE.getContent(),
          state: 'published',
          subline: this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString(),
          title: this.articleTitle.nativeElement.value
        }
  
        this.newsApi.postNews(newsToSave).pipe(
          tap(newsAdded => {
            this.listMode = 'news'
            this.newsOnEdition = newsAdded;
            this.newslist.addNewsResponse(newsAdded);
            this.postNewsSpinner = false;
            this.router.navigate(['/app/news', newsAdded.id])
          })
        ).subscribe()
  
      } else {
        let newsToUpdate = {
          content: this.RTE.getText(),
          obj: this.RTE.getContent(),
          state: 'published',
          title: this.articleTitle.nativeElement.value
        }
  
        this.newsApi.updateNews(this.newsOnEdition.id, newsToUpdate).pipe(
          tap(newsAdded => {          
            this.postNewsSpinner = false;
            this.listMode = 'news'
            this.router.navigate(['/app/news', this.newsOnEdition.id])
          })
        ).subscribe()
  
      }
    } else {      
      this.postNewsSpinner = false;
      this.sinContenidoModalOpen = true;
    }


  }

}