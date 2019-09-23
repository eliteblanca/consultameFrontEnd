import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { lineWithSublines } from "../../api/lines-api.service";
import { LinesApiService } from "../../api/lines-api.service";
import { SublinesApiService } from "../../api/sublines-api.service";

@Component({
  selector: 'app-line-allowed',
  templateUrl: './line-allowed.component.html',
  styleUrls: ['./line-allowed.component.css']
})
export class LineAllowedComponent implements OnInit {

  constructor(
    private linesApi: LinesApiService,
    private sublinesApi: SublinesApiService
  ) { }

  @Output() onDeletedLine = new EventEmitter();
  @Output() onDeletedSubLine = new EventEmitter();

  @Input() line: lineWithSublines;

  public desplegado: boolean = true;

  ngOnInit() {
    this.line.name
  }

  deleteLine() {
    this.linesApi.deleteLine(this.line.id)
      .subscribe(result => {
        console.log(result);
        this.onDeletedLine.next(this.line.id);
      })
  }

  deleteSubline(subLineId: string) {
    this.sublinesApi.deleteSubline(subLineId)
      .subscribe(result => {
        console.log(result);
        this.line.sublines = this.line.sublines.filter(subline => subline.id != subLineId)
        this.onDeletedSubLine.next(subLineId);
      })
  }

}