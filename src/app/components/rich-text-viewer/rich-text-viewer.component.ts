import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RichTextEditorComponent as RTE } from '@syncfusion/ej2-angular-richtexteditor';


@Component({
  selector: 'app-rich-text-viewer',
  templateUrl: './rich-text-viewer.component.html',
  styleUrls: ['./rich-text-viewer.component.css']
})
export class RichTextViewerComponent implements OnInit {
  constructor() { }

  @Input() content:string;
  @ViewChild(RTE,{ static:false }) public RTE: RTE;

  ngOnInit() {
  }
  
  public tools = {
    enable: false,
    enableFloating: true,
    type: 'Expand',
    items: ['FullScreen']
  };

  public iframe = {
    enable: true,
    attributes: {
      
    },
    resources: {
      scripts: ['/stiles.js'],  // script.js
      styles: ['']    // css
    }
  };

  setContent = (content) => this.RTE.value = content;
}
