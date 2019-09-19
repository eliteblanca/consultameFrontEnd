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

    public iconCategories: string[] = [
        'categorie 1',
        'categorie 2',
        'categorie 3',
        'categorie 4',
        'categorie 5'
    ]
}
