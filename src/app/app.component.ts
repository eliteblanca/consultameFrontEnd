import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from './services/index';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  styles: [],
  templateUrl:'./app.component.html',
  providers:[Title]
})
export class AppComponent implements OnInit {
  constructor(public events:EventsService, public router:Router, public route:ActivatedRoute, public title:Title){
    
  }

  ngOnInit(){
    this.events.onNewSearch$.subscribe(newSearch=>{
      if(newSearch){
        this.title.setTitle(newSearch);
        
        this.router.navigate(['/app/search'],{ queryParams: { query: newSearch },queryParamsHandling: 'merge' })
      }
    })

    this.route.queryParams.subscribe(params=>{
      if(params['query']){
        this.events.newQuery(params['query']);
      }
    })
  }

}
