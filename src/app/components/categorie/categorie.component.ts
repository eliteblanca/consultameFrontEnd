import { Component, OnInit, Input } from '@angular/core';

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

  @Input() public category:category;
  @Input() public belongsTo:string;

  constructor() { }

  ngOnInit() {
    
  }
}