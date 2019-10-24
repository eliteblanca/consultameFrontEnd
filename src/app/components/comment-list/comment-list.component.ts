import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommentsApiService, comment } from "../../api/comments-api.service";
import { tap } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, AfterViewInit {


  @Input()
  articleId: string;

  @ViewChild('input', { static:false })
  input: ElementRef;

  public comments: comment[] = []
  public emojiMode = false;
  public commentOnReply = '';

  private inputkeyUp$:Observable<any>


  constructor(private commentsApi: CommentsApiService) {  }

  ngOnInit() {
    this.commentsApi.getComments(this.articleId, { from: 0, size: 10 }).pipe(
      tap(comments => {
        this.comments = comments
      })
    ).subscribe()
  }

  ngAfterViewInit(): void {
   
  }

  AutoGrowTextArea(textField) {
  
  }

  sendComment(){
    this.commentsApi.postComment({ text :this.input.nativeElement.value },this.articleId).pipe(
      tap(newComment => {
        this.comments = [...[newComment], ...this.comments] ,
        this.input.nativeElement.value = '';
      })
    ).subscribe()
  }

  iconoSeleccionado(event){
    if((this.input.nativeElement.value + event.emoji.native).length < 150 ){
      this.input.nativeElement.value = this.input.nativeElement.value.slice(0,this.input.nativeElement.selectionStart) + event.emoji.native + this.input.nativeElement.value.slice(this.input.nativeElement.selectionStart)
    }
  }

  public localStrings = {
    search: 'Buscar',
    emojilist: 'Lista de emojis',
    notfound: 'Ningun emoji encontrado',
    clear: 'Limpiar',
    categories: {
      search: 'Resultados',
      recent: 'Mas usados',
      people: 'Sonrisas y personas',
      nature: 'Animales y naturaleza',
      foods: 'Comidas y bebidas',
      activity: 'Actividades',
      places: 'Viaje y lugares',
      objects: 'Objetos',
      symbols: 'Simbolos',
      flags: 'Banderas',
      custom: 'Custom',
    },
    skintones: {
      1: 'Default Skin Tone',
      2: 'Light Skin Tone',
      3: 'Medium-Light Skin Tone',
      4: 'Medium Skin Tone',
      5: 'Medium-Dark Skin Tone',
      6: 'Dark Skin Tone',
    },
  }


}