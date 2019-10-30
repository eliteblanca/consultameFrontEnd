import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from "../../article";
import settingsIcon from '@iconify/icons-mdi/settings';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css', '../../../../node_modules/ng-masonry-grid/ng-masonry-grid.css']
})
export class HeaderComponent implements OnInit {

    constructor() { }

    settingsIcon = settingsIcon;

    newSearchSubs: Subscription;

    ngOnInit() {
    }

}