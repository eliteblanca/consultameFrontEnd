import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

    constructor() { }

    @Input() iconName: string;


    ngOnInit() {

    }

}
