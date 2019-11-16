import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {

  @Input() data
  @Input() child
  @Input() childText
  @Input() dataText
  @Output() onChildSeleccionado = new EventEmitter();

  constructor() {  }

  ngOnInit() {  }

  childSeleccionado(event){
    this.onChildSeleccionado.next(event)
  }

}