import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { lineWithSublines } from "../../api/lines-api.service";
import { LinesApiService } from "../../api/lines-api.service";
import { SublinesApiService } from "../../api/sublines-api.service";

@Component({
    selector: 'app-line-editable',
    templateUrl: './line-editable.component.html',
    styleUrls: ['./line-editable.component.css']
})
export class LineEditableComponent implements OnInit {

    constructor(
        private linesApi: LinesApiService,
        private sublinesApi: SublinesApiService
    ) { }

    @Output() onDeletedLine = new EventEmitter();
    @Output() onLineSelected = new EventEmitter();

    @Input() line: lineWithSublines;

    public desplegado: boolean = true;

    ngOnInit() {
        this.line.name
    }

    updateLine(name: string) {
        this.linesApi.updateLine(this.line.id, name)
            .subscribe(response => {
                this.line.name = name;
            })
    }

    updateSubline(id: string, name: string) {
        this.sublinesApi.updateSubLine(id, name)
            .subscribe(response => {
                let subLineIndex = this.line.sublines.findIndex(subline => subline.id == id);
                this.line.sublines[subLineIndex].name = name;
            })
    }

    createSubLine(name) {
        this.sublinesApi.createSubLine(this.line.id, name)
            .subscribe(response => this.line.sublines.push(response))
    }

    deleteLine() {
        this.linesApi.deleteLine(this.line.id)
            .subscribe(result => {
                console.log(result);
                this.onDeletedLine.next(this.line.id);
            })

    }

    selectSubline(idSubline){
        this.onLineSelected.next(idSubline);
    }

}