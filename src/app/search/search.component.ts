import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public busqueda:string = "";

  constructor(public route:ActivatedRoute) {  }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.busqueda = params['query'];
    })
  }

}
