import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {

  @Output() onChange = new EventEmitter()
  public checked = false

  constructor() {  }

  ngOnInit() {  }

  

}