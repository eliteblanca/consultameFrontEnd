import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DiccionarioEjemplo } from "../diccionario-ejemplo";
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  @ViewChild('busqueda',{static:false}) busqueda: ElementRef;
  
  suggestions:string[];
  diccionario:string[] = new DiccionarioEjemplo().listadoPalabras
  onFocus(){
    if(!this.busqueda.nativeElement.value){
      this.suggestions = this.diccionario.slice(0,10);
    }
  }

  onFocusout(){
    this.suggestions = [];
  }

  onKeyup(){
    this.suggestions = this.diccionario.filter((x)=>{
      return new RegExp(`^${this.busqueda.nativeElement.value}.*$`).test(x);
    }).slice(0,10);
  }

  constructor() { }

  ngOnInit() {
  }

}
