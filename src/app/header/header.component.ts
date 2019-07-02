import { Component, OnInit } from '@angular/core';
import { EventsService } from "../events.service";
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  newSearchSubs:Subscription;

  ngOnInit() {
    
  }

}
