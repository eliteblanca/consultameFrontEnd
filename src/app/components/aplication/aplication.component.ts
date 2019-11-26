import { Component, OnInit } from '@angular/core';
import { StateService } from "../../services/state.service";
@Component({
    selector: 'app-aplication',
    templateUrl: './aplication.component.html',
    styleUrls: ['./aplication.component.css']
})
export class AplicationComponent implements OnInit {

    constructor(public state:StateService) { }

    ngOnInit() {  }

}
