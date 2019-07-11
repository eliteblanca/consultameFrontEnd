import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

type categories = {
  name:string,
  order:number,
  desplegado:boolean,
  subcategories?:categories
}[];

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Output() onSelected: EventEmitter<string> = new EventEmitter();
  @Input() categories:categories;

  categoriaSeleccionada(categoria:string){
    this.onSelected.emit(categoria);
  }

  constructor() { }

  ngOnInit() {
  }

}