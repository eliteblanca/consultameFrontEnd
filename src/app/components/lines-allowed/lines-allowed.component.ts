import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LinesApiService, lineWithSublines } from "../../api/lines-api.service";

@Component({
    selector: 'app-lines-allowed',
    templateUrl: './lines-allowed.component.html',
    styleUrls: ['./lines-allowed.component.css']
})
export class LinesAllowedComponent implements OnInit {

    @Input() lines: lineWithSublines[];
    @Output() onLineDeleted = new EventEmitter();
    @Output() onSubLineDeleted = new EventEmitter();

    ngOnInit() {
    }

    lineaEliminada(lineId: string) {
        this.onLineDeleted.next(lineId);
    }

    sublineaEliminada(sublineId: string) {
        this.onSubLineDeleted.next(sublineId)
    }
}
