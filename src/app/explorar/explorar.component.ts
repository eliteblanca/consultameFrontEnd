import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable,fromEvent,merge } from 'rxjs';
import { filter,map, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {

  constructor(public route:ActivatedRoute) {  }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      if(params['category']){

      }
    })
  }

}
