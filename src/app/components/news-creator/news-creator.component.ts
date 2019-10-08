import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventsService } from "../../services/events.service";
import { filter, switchMap } from 'rxjs/operators';
import { NewsApiService, news, newsDTO, UpdateNewsDTO } from "../../api/news-api.service";
import { RichTextEditorComponent } from "../rich-text-editor/rich-text-editor.component";
import { NewsListEditableComponent } from "../news-list-editable/news-list-editable.component";
import { of } from 'rxjs';

@Component({
  selector: 'app-news-creator',
  templateUrl: './news-creator.component.html',
  styleUrls: ['./news-creator.component.css']
})
export class NewsCreatorComponent implements OnInit {

  @ViewChild(RichTextEditorComponent, { static: false })
  RTE: RichTextEditorComponent

  @ViewChild(NewsListEditableComponent, { static: false })
  newslist: NewsListEditableComponent

  @ViewChild('articleTitle', { static: false })
  articleTitle: ElementRef

  newsOnEdition: news;
  listMode: 'news' | 'draft' = 'news';

  constructor(
    private eventsService: EventsService,
    private newsApi: NewsApiService
  ) { }

  ngOnInit() {
    return this.eventsService.newSelectedLineSource.pipe(
      filter(selectedLine => selectedLine.line != null && selectedLine.subLine != null)
    ).subscribe(selectedLine => this.selectedSubline = selectedLine.subLine.id)
  }

  selectedSubline: string;

  addNewsMode = false;

  onAddNews() {
    this.RTE.setContent({})
    this.articleTitle.nativeElement.value = ''
    this.newsOnEdition = undefined;
  }

  publishNews() {
    if (this.newsOnEdition) {
      let newsToUpdate: UpdateNewsDTO = {
        content: this.RTE.getText(),
        obj: this.RTE.getContent(),
        state: 'published',
        title: this.articleTitle.nativeElement.value
      }

      this.newsApi.updateNews(this.newsOnEdition.id, newsToUpdate).subscribe(result => {
        this.listMode = 'news'
        console.log('navegar a la noticia')
      })
    } else {
      let newsToSave: newsDTO = {
        attached: [],
        content: this.RTE.getText(),
        obj: this.RTE.getContent(),
        state: 'published',
        subline: this.selectedSubline,
        title: this.articleTitle.nativeElement.value
      }

      this.newsApi.postNews(newsToSave).subscribe(newsAdded => {
        this.listMode = 'news'
        this.newsOnEdition = newsAdded;
        this.newslist.addNewsResponse(newsAdded)
      })
    }

  }

  saveAsDraft() {
    let newsToSave: newsDTO = {
      attached: [],
      content: this.RTE.getText(),
      obj: this.RTE.getContent(),
      state: 'archived',
      subline: this.selectedSubline,
      title: this.articleTitle.nativeElement.value
    }
    if (this.newsOnEdition) {
      this.newsApi.updateNews(this.newsOnEdition.id,newsToSave).subscribe(newsAdded => {
        console.log('borrador actualizado')
      })
    } else {
      this.newsApi.postNews(newsToSave).subscribe(newsAdded => {
        this.newslist.addAsDraftResponse(newsAdded)
        this.newsOnEdition = newsAdded;
        this.listMode = 'draft';
      })
    }
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