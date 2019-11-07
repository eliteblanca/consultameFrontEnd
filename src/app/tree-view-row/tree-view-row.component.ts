import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tree-view-row',
  templateUrl: './tree-view-row.component.html',
  styleUrls: ['./tree-view-row.component.css']
})
export class TreeViewRowComponent implements OnInit {

  @Input() data
  @Input() child
  @Input() childText
  @Input() dataText

  constructor() { }

  ngOnInit() {
  }

}
