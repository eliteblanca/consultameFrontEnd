import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

type category = {
  name:string,
  order:number,
  desplegado:boolean,
  subcategories?:category[]
}

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  @Output() onSelected: EventEmitter<string> = new EventEmitter();
  @Input() public category:category;
  @Input() public belongsTo:string;

  constructor() { }

  ngOnInit() {
  }

  categoriaSeleccionada(categoria?:string):void{
    if(typeof categoria == 'undefined'){
      this.onSelected.emit(this.belongsTo + '/' + this.category.name);
    }else{
      this.onSelected.emit(categoria);
    }
  }

}