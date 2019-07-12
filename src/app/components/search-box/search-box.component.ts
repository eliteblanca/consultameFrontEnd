import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { DiccionarioEjemplo } from "../../diccionario-ejemplo";
import { Observable, fromEvent} from 'rxjs';
import { filter,map, distinctUntilChanged } from "rxjs/operators";
import { ApiService, EventsService } from "../../services/index";


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, AfterViewInit {

  @Output() nuevaBusqueda = new EventEmitter(); 
  @ViewChild('busqueda',{static:false}) busqueda: ElementRef;
  
  nextWord:string = "";
  lastWord:string = "";
  suggestions:{selected:boolean,value:string}[] = [];
  diccionario:string[] = new DiccionarioEjemplo().listadoPalabras;
  public onkeydown$:Observable<KeyboardEvent>;
  public onArrows$:Observable<KeyboardEvent>;
  public onEnter$:Observable<KeyboardEvent>;
  public onNewWord$:Observable<string>;
  public onWordCountChange$:Observable<string>;
  public onValueChange$:Observable<string>;

  ngOnInit(){
    
  }

  ngAfterViewInit() {
    this.onkeydown$ = fromEvent(this.busqueda.nativeElement, 'keydown');
    this.onArrows$ = this.onkeydown$.pipe(
      filter(({code})=>  code == 'ArrowDown' || code == "ArrowUp" || code == "ArrowLeft" || code == "ArrowRight")
    );
    this.onEnter$ = this.onkeydown$.pipe(
      filter(({code})=>  code == 'Enter')
    );

    this.onWordCountChange$ = this.onkeydown$.pipe(
      filter(({code})=>  code == 'Space' || code == 'Backspace'),
      map($event=>{
        return [$event,this.getInputValue($event).trim().split(' ').length]
      }),
      distinctUntilChanged((prev, curr) => prev[1] === curr[1]),
      map((val:[KeyboardEvent,number])=>{
        return this.getInputValue(val[0])
      })
    )

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
    });
    this.onEnter$.subscribe(val=>{
      if(this.suggestions.find(x=>x.selected)){
        this.busqueda.nativeElement.value = this.suggestions.find(x=>x.selected).value;
        this.suggestions[this.suggestions.findIndex(x=>x.selected)].selected = false;
        this.getSuggestions(this.busqueda.nativeElement.value.trim())
      }else if(this.getInputValue()){
        this.buscar();
      }
    });
    this.onWordCountChange$.subscribe(val=>{
      this.getSuggestions(val.trim());
    })

    this.events.onNewQuery$.subscribe(query=>{
      this.buscar(query);
    })
  }
 
  buscar(value?:string):void{
    if(value){
      this.events.newSearch(value);
      this.busqueda.nativeElement.value = value;
      this.api.postSuggestion(value)
      .subscribe(val=>{
        console.log('guardado');
      });
    }else{
      this.events.newSearch(this.getInputValue());
      this.api.postSuggestion(this.getInputValue())
      .subscribe(val=>{
        console.log('guardado');
      });
    }
  }

  getSuggestions(input?:string){
    //:{selected:boolean,value:string}[]  
    this.api.getSuggestions(input).pipe(
        map(x=>x.map((y)=>{
          return {selected: false,value:y}
        }))
      ).subscribe(x=>{
        this.suggestions = x.slice(0,10);
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

  constructor(public api:ApiService, public events:EventsService) { }

}