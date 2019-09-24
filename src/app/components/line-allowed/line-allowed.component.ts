import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lineWithSublines } from "../../api/lines-api.service";

@Component({
  selector: 'app-line-allowed',
  templateUrl: './line-allowed.component.html',
  styleUrls: ['./line-allowed.component.css']
})
export class LineAllowedComponent implements OnInit {

  constructor(  ) {  }

  @Output() onDeletedLine = new EventEmitter();
  @Output() onDeletedSubLine = new EventEmitter();

  @Input() line: lineWithSublines;

  public desplegado: boolean = true;

  ngOnInit() {
    this.line.name
  }

  deleteLine() {
  }

  deleteSubline(subLineId:string) {
    this.onDeletedSubLine.next(subLineId)
  }

}