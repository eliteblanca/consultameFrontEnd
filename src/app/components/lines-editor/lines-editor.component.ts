import { Component, OnInit, Input } from '@angular/core';
import { LinesApiService, lineWithSublines } from "../../api/lines-api.service";


@Component({
    selector: 'app-lines-editor',
    templateUrl: './lines-editor.component.html',
    styleUrls: ['./lines-editor.component.css']
})
export class LinesEditorComponent implements OnInit {

    constructor(private linesApi: LinesApiService) { }

    @Input() lines: lineWithSublines[];

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
}
