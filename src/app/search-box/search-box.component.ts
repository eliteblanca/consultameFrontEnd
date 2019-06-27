import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DiccionarioEjemplo } from "../diccionario-ejemplo";
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  @ViewChild('busqueda',{static:false}) busqueda: ElementRef;
  
  nextWord:string = "";
  lastWord:string = "";
  suggestions:string[];
  diccionario:string[] = new DiccionarioEjemplo().listadoPalabras;

  onFocus(){
    if(!this.busqueda.nativeElement.value){
      this.suggestions = this.diccionario.slice(0,10);
    }
  }

  onFocusout(){
    this.suggestions = [];
  }

  onKeyup($event){
    if($event.code == "Space" || $event.code == "Enter"){
      this.nextWord = "";
    }else{
      let index = this.busqueda.nativeElement.value.split(' ').length-1;
      if(index >= 0){
        this.nextWord = this.diccionario.filter((x)=>{
          return new RegExp(`^${this.busqueda.nativeElement.value.split(' ')[index]}.*$`).test(x);
        })[0];
      }
    }
    
    if($event.code == "Tab"){
      let aux = this.busqueda.nativeElement.value.split(' ');
      aux.pop();
      aux.push(this.nextWord);      
      this.busqueda.nativeElement.value = aux.join(' ') + ' ';
      this.nextWord = "";
    }

    this.suggestions = this.diccionario.filter((x)=>{
      return new RegExp(`^${this.busqueda.nativeElement.value}.*$`).test(x);
    }).slice(0,10);
  }

  constructor() { }

  ngOnInit() {
  }

}
