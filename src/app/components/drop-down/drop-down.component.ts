import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {

  constructor() { }

  @Input() textoInicial:string;
  @Input() textField:string;
  @Input() values:any = [];

  @Output() onValueSelected = new EventEmitter();

  seleccion:any;

  ngOnInit() {
  }

  seleccionar(seleccion:any){
    this.seleccion = seleccion;
    this.onValueSelected.next(seleccion)
  }

}
