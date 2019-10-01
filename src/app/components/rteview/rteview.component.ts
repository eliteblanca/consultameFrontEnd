import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rteview',
  templateUrl: './rteview.component.html',
  styleUrls: ['./rteview.component.css']
})
export class RTEViewComponent implements OnInit {

  @Input() content;

  constructor() { }

  ngOnInit() {
  }

}
