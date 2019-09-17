import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LinesApiService, lineWithSublines } from "../../api/lines-api.service";


@Component({
    selector: 'app-lines-editor',
    templateUrl: './lines-editor.component.html',
    styleUrls: ['./lines-editor.component.css']
})
export class LinesEditorComponent implements OnInit {

    constructor(private linesApi: LinesApiService) { }

    @Input() lines: lineWithSublines[];
    @Output() onLineSelected = new EventEmitter();
    ngOnInit() {
    }

    createLine(name: string) {
        this.linesApi.createLine(name)
            .subscribe(result => {
                this.lines.push({
                    ...result,
                    sublines: []
                })
            });
    }

    lineaEliminada(lineId: string) {
        this.lines = this.lines.filter(line => line.id != lineId)
    }

    selectSubline(idSubline){
        this.onLineSelected.next(idSubline);
    }
}
