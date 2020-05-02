import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-articleplaceholder',
  templateUrl: './articleplaceholder.component.html',
  styleUrls: ['./articleplaceholder.component.css']
})
export class ArticleplaceholderComponent implements OnInit {
  
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
