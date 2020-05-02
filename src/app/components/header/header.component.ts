import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from "../../article";
import settingsIcon from '@iconify/icons-mdi/settings';
import { StateService } from "../../services/state.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(public state:StateService) {  }

    settingsIcon = settingsIcon;

    newSearchSubs: Subscription;

    ngOnInit() {  }

    toggleSideSheet(){
        this.state.toogleSideSheet()
    }

}