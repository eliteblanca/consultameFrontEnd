import { Component, OnInit,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DiccionarioEjemplo } from "../diccionario-ejemplo";
import { Observable,fromEvent,merge } from 'rxjs';
import { filter,map, distinctUntilChanged } from "rxjs/operators";
import { ApiService } from "../api.service";
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
  providers: [ApiService]
})
export class SearchBoxComponent implements OnInit, AfterViewInit {

  @ViewChild('busqueda',{static:false}) busqueda: ElementRef;
  
  nextWord:string = "";
  lastWord:string = "";
  suggestions:{selected:boolean,value:string}[];
  diccionario:string[] = new DiccionarioEjemplo().listadoPalabras;
  public onkeydown$:Observable<KeyboardEvent>;
  public onArrows$:Observable<KeyboardEvent>;
  public onEnter$:Observable<KeyboardEvent>;
  public onNewWord$:Observable<string>;
  public onWordCountChange$:Observable<string>;


  ngOnInit(){}

  ngAfterViewInit() {
    this.onkeydown$ = fromEvent(this.busqueda.nativeElement, 'keydown');
    this.onArrows$ = this.onkeydown$.pipe(
      filter(({code})=>  code == 'ArrowDown' || code == "ArrowUp" || code == "ArrowLeft" || code == "ArrowRight")
    );
    this.onEnter$ = this.onkeydown$.pipe(
      filter(({code})=>  code == 'Enter')
    );
    this.onNewWord$ = this.onkeydown$.pipe(
      filter(({code})=>  code == 'Space'),
      map(val=>this.getInputValue().trim().split(' ')),
      distinctUntilChanged(),
      map(val=>this.getInputValue())
    );

    this.onWordCountChange$ = this.onkeydown$.pipe(
      map(val=>this.getInputValue().trim().split(' '))
    );

    this.onkeydown$.subscribe(($event)=>{
      let {code} = $event;
      if(code == "Space" || code == "Enter"){
        this.nextWord = "";
      }else{
        this.nextWord = this.findNextWord($event);
      }

      if(code == "Tab"){
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
    });
    this.onArrows$.subscribe(($event)=>{
      let {code} = $event;
      $event.preventDefault();
      if(this.suggestions.length > 0){
        if(code == 'ArrowDown'){
          this.suggestions = this.suggestions.map((x,index)=>{
            if( index == 0 && this.suggestions[this.suggestions.length-1].selected){
              return {selected:true,value:x.value}
            }
            if( index == this.suggestions.length-1 && x.selected){
              return {selected:false,value:x.value}
            }
            if(index-1 >= 0 && this.suggestions[index-1].selected){
              return {selected:true,value:x.value}
            }
            if(index == 0 && this.suggestions.findIndex(x=>x.selected) == -1){
              return {selected:true,value:x.value}
            }
            return {selected:false,value:x.value}
          })
        }
        if(code == 'ArrowUp'){
          this.suggestions = this.suggestions.map((x,index)=>{
            if( index == 0 && x.selected){
              this.setCaretToPos(this.busqueda.nativeElement,10000);
              return {selected:false,value:x.value}
            }
            if(index+1 <= this.suggestions.length-1 && this.suggestions[index+1].selected){
              return {selected:true,value:x.value}
            }
            if(index == this.suggestions.length-1 && x.selected){
              return {selected:false,value:x.value}
            }
            return {selected:false,value:x.value}
          })
        }
      }
      console.log("flecha")
    });
    this.onEnter$.subscribe(val=>{
      if(this.suggestions.find(x=>x.selected)){
        this.busqueda.nativeElement.value = this.suggestions.find(x=>x.selected).value;
      }else if(this.getInputValue()){
        this.api.postSuggestion(this.getInputValue())
        .subscribe(val=>{
          console.log('guardado');
        });
        window.alert(`buscando por ${this.getInputValue()}`);
      }
    });
    this.onNewWord$.subscribe(val=>{
      this.getSuggestions(val);
    })
  }
 
  getSuggestions(input?:string){
    //:{selected:boolean,value:string}[]  
    this.api.getSuggestions(input).pipe(
        map(x=>x.map((y)=>{
          return {selected: false,value:y}
        }))
      ).subscribe(x=>{
        this.suggestions = x;
        console.log(this.suggestions);
      })
  }

  onFocus(){
    this.getSuggestions();
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

  constructor(public api:ApiService) { } 

}
