import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-icon-picker',
    templateUrl: './icon-picker.component.html',
    styleUrls: ['./icon-picker.component.css']
})
export class IconPickerComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }


    private iconNames: string[] = [
        ''
    ]
}
