import { Component, OnInit } from '@angular/core';
import { LinesApiService, lineWithSublines } from "../../api/lines-api.service";

@Component({
    selector: 'app-edicion',
    templateUrl: './edicion.component.html',
    styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {

    private prueba = "asdas";

    private lines: lineWithSublines[];

    constructor(private linesApi: LinesApiService) { }

    ngOnInit() {
        this.linesApi.getLines().subscribe(lines => {
            console.log(lines)
            this.lines = lines;
        })

    }

}