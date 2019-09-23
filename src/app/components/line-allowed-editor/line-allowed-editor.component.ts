import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LinesApiService, lineWithSublines } from '../../api/lines-api.service';
import { SublinesApiService } from '../../api/sublines-api.service';

@Component({
  selector: 'app-line-allowed-editor',
  templateUrl: './line-allowed-editor.component.html',
  styleUrls: ['./line-allowed-editor.component.css']
})
export class LineAllowedEditorComponent implements OnInit {

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

}
