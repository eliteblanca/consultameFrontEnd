import { Component, OnInit,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DiccionarioEjemplo } from "../diccionario-ejemplo";
import {Observable,fromEvent,timer} from 'rxjs';
import { filter,debounceTime } from "rxjs/operators";
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, AfterViewInit {

  constructor() { } 

  @ViewChild('busqueda',{static:false}) busqueda: ElementRef;
  
  nextWord:string = "";
  lastWord:string = "";
  suggestions:{selected:boolean,value:string}[];
  diccionario:string[] = new DiccionarioEjemplo().listadoPalabras;
  public onkeydown$:Observable<KeyboardEvent>;
  public onArrows$:Observable<KeyboardEvent>;

  ngOnInit() {}

  ngAfterViewInit() {
    this.onkeydown$ = fromEvent(this.busqueda.nativeElement, 'keydown');
    this.onkeydown$.subscribe(($event)=>{
      console.log($event);
      if($event.code == "Space" || $event.code == "Enter"){
        this.nextWord = "";
      }else{
        this.nextWord = this.findNextWord($event);
      }

      if($event.code == "Tab"){
        $event.preventDefault();
        $event.stopPropagation();
        if(this.nextWord){
          let aux = this.getInputValue($event).split(' ').filter((x)=>x != '');
          aux.pop();
          aux.push(this.nextWord.toLowerCase());
          this.busqueda.nativeElement.value = aux.join(' ');
          this.nextWord = this.findNextWord($event);
          this.setCaretToPos(this.busqueda.nativeElement,10000);
        }
      }

      this.suggestions = this.diccionario
          .filter((x)=>{
            return new RegExp(`^${this.getInputValue($event)}.*$`).test(x);})
          .slice(0,10)
          .map((x)=>{
            return {selected:false, value:x};
        });    
    });

    this.onArrows$ = this.onkeydown$.pipe(
      filter(({code})=>  code == 'ArrowDown' || code == "ArrowUp" || code == "ArrowLeft" || code == "ArrowRight")
    )
    
    this.onArrows$.subscribe(({code})=>{
      
      console.log("flecha")
    })
  }

  onFocus(){
    if(!this.busqueda.nativeElement.value){
      this.suggestions = this.diccionario
          .filter((x)=>{
            return new RegExp(`^${this.getInputValue()}.*$`).test(x);})
          .slice(0,10)
          .map((x)=>{
            return {selected:false, value:x};
        }); 
    }
  }

  onFocusout(){
    this.suggestions = [];
  }

  setCaretToPos(input, pos) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(pos, pos);
    }
    else if (input.createTextRange) {
      var savedTabIndex = input.getAttribute('tabindex');
      input.setAttribute('tabindex', '-1');
      input.focus();
      input.setAttribute('tabindex', savedTabIndex);
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  compareWords(x:String,y:string):boolean{    
    return new RegExp(`^${x.toLowerCase().replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u')}.*$`).test(y.toLowerCase().replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u'))
    && x.toLowerCase().replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u') != y.toLowerCase().replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u')
  }

  getInputValue($event?:KeyboardEvent):string{
    if($event && $event.which >= 65 && $event.which <= 90){
      return this.busqueda.nativeElement.value + $event.key;
    }else{
      return this.busqueda.nativeElement.value
    }
  }

  findNextWord($event:KeyboardEvent):string{
    let cantidadPalabras = this.getInputValue($event).split(' ').filter((x)=>x != '').length;
    if(cantidadPalabras > 0 && this.getInputValue($event).length>1){
      return this.diccionario.find((x)=>{
        return this.compareWords(this.getInputValue($event).split(' ')[cantidadPalabras-1],x)
      });
    }else{
      return "";
    }
  }
}
