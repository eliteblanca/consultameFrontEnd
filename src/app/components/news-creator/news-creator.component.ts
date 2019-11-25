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

  constructor(
    private eventsService: EventsService,
    private newsApi: NewsApiService,
    private router: Router,
    public state: StateService,
  ) { }

  ngOnInit() {  }

  ngAfterViewInit(): void {
    this.postDraftDTO$ = fromEvent(this.saveAsDraftButton.nativeElement, 'click').pipe(
      switchMap(event => this.state.selectedPcrc$),
      map<cliente['pcrcs'][0], newsDTO>(pcrc => {
        return {
          attached: [],
          content: this.RTE.getText(),
          obj: this.RTE.getContent(),
          state: 'archived',
          subline: pcrc.id_dp_pcrc.toString() ,
          title: this.articleTitle.nativeElement.value
        }
      })
    )

    this.postNews$ = fromEvent(this.publishNewsButton.nativeElement, 'click').pipe(
      filter(event => !!!this.newsOnEdition),      
      switchMap(event => this.state.selectedPcrc$),
      map<cliente['pcrcs'][0], newsDTO>(pcrc => {
        return {
          attached: [],
          content: this.RTE.getText(),
          obj: this.RTE.getContent(),
          state: 'published',
          subline: pcrc.id_dp_pcrc.toString(),
          title: this.articleTitle.nativeElement.value
        }
      }),
      switchMap(newsToSave => this.newsApi.postNews(newsToSave)),
      tap( newsAdded => {
        this.listMode = 'news'
        this.newsOnEdition = newsAdded;
        this.newslist.addNewsResponse(newsAdded)
        this.router.navigate(['/app/news', newsAdded.id])
      })
    )

    this.updateNews$ = fromEvent(this.publishNewsButton.nativeElement, 'click').pipe(
      filter(event => !!this.newsOnEdition),
      map<any, UpdateNewsDTO>(event => {
        return {
          content: this.RTE.getText(),
          obj: this.RTE.getContent(),
          state: 'published',
          title: this.articleTitle.nativeElement.value
        }
      }),
      switchMap(newsToUpdate => this.newsApi.updateNews(this.newsOnEdition.id, newsToUpdate)),
      tap( newsAdded => {
        this.listMode = 'news'
        this.router.navigate(['/app/news', this.newsOnEdition.id])
      })
    )

    this.postDraft$ = this.postDraftDTO$.pipe(
      filter(newsToSave => !!!this.newsOnEdition),
      switchMap(newsToSave => this.newsApi.postNews(newsToSave)),
      tap(newsAdded => {
        this.newsOnEdition = newsAdded;
        this.listMode = 'draft';
        this.newslist.concatNews(newsAdded)
      })
    )

    this.updateDraft$ = this.postDraftDTO$.pipe(
      filter(newsToSave => !!this.newsOnEdition),
      switchMap(newsToSave => this.newsApi.updateNews(this.newsOnEdition.id, newsToSave)),
      tap(result => {
        window.alert('borrador actualizado')
      })
    )

    this.postDraft$.subscribe()

    this.updateDraft$.subscribe()

    this.postNews$.subscribe()

    this.updateNews$.subscribe()

  }  

  addNewsMode = false;

  onAddNews() {
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
}