import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { lineWithSublines } from '../../api/lines-api.service';

@Component({
  selector: 'app-lines-allowed-editor',
  templateUrl: './lines-allowed-editor.component.html',
  styleUrls: ['./lines-allowed-editor.component.css']
})
export class LinesAllowedEditorComponent implements OnInit {


  @Input() lines: lineWithSublines[];
  @Output() onLineDeleted = new EventEmitter();
  @Output() onSubLineDeleted = new EventEmitter();
  @Output() onSubLineAllowed = new EventEmitter();

  ngOnInit() {
  }

  lineaEliminada(lineId: string) {
    this.lines = this.lines.filter(line => line.id != lineId)
    this.onLineDeleted.next(lineId);
  }

  sublineaEliminada(sublineId: string) {
    this.onSubLineDeleted.next(sublineId)
  }

  subLineAllowed(subline:{ name: string, id: string }) {
    this.onSubLineAllowed.next(subline);
  }
}