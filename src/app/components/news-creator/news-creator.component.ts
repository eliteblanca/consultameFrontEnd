import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventsService } from "../../services/events.service";
import { filter, switchMap } from 'rxjs/operators';
import { NewsApiService, news, newsDTO } from "../../api/news-api.service";
import { RichTextEditorComponent } from "../rich-text-editor/rich-text-editor.component";
import { NewsListEditableComponent } from "../news-list-editable/news-list-editable.component";

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
    this.addNewsMode = true;
  }

  publishNews() {
    let newsToSave: newsDTO = {
      attached: [],
      content: this.RTE.getText(),
      obj: this.RTE.getContent(),
      state: 'published',
      subline: this.selectedSubline,
      title: this.articleTitle.nativeElement.value
    }

    this.newsApi.postNews(newsToSave).subscribe(newsAdded => {
      this.newslist.addNewsResponse(newsAdded)
    })

  }
}