import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CommentsApiService, comment } from "../../api/comments-api.service";
import formatDistance from 'date-fns/formatDistance'
import fromUnixTime from 'date-fns/fromUnixTime'
import { es } from 'date-fns/locale'
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment:comment;
  
  @ViewChild('input', { static:false })
  input: ElementRef;

  replyMode = false;
  emojiMode = false;

  constructor(private commentsApi:CommentsApiService) { }

  ngOnInit() {
    this.commentsApi.getRepliesTo(this.comment.id,{ from:0 ,size:10 }).pipe(
      tap(comments => {
        this.comment.replies = comments
      })
    ).subscribe()

  }
  
  gethumanTime = (time) => {
    return formatDistance( new Date(time) ,new Date(),{ addSuffix: true , includeSeconds:true, locale:es })
  }

  sendComment(){
    this.commentsApi.postComment({ text :this.input.nativeElement.value, replyTo:this.comment.id }, this.comment.article).pipe(
      tap(newComment => {
        this.comment.replies = [ ...[newComment] ,...this.comment.replies ];
        this.input.nativeElement.value = '';
        this.replyMode = false;
      })
    ).subscribe()
  }

  iconoSeleccionado(event){
    if((this.input.nativeElement.value + event.emoji.native).length < 150 ){
      this.input.nativeElement.value = this.input.nativeElement.value.slice(0,this.input.nativeElement.selectionStart) + event.emoji.native + this.input.nativeElement.value.slice(this.input.nativeElement.selectionStart)
    }
  }

}