import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, TableService,QuickToolbarSettingsModel, RichTextEditorComponent as RTE  } from '@syncfusion/ej2-angular-richtexteditor';
import { inputs } from '@syncfusion/ej2-angular-richtexteditor/src/rich-text-editor/richtexteditor.component';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css'],
  providers: [ToolbarService, HtmlEditorService,TableService, QuickToolbarService, ImageService, LinkService ]
})
export class RichTextEditorComponent implements OnInit {

  constructor() { }

  @Input() content:string;
  @ViewChild(RTE,{ static:false }) public RTE: RTE;

  ngOnInit() {
  }

  public tools = {
    enableFloating: true,
    type: 'Expand',
    items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
    'LowerCase', 'UpperCase', '|',
    'Alignments', 'OrderedList', 'UnorderedList',
    'Outdent', 'Indent', '|',
    'CreateLink', 'Image','Createtable', '|', 'ClearFormat', 'Print',
    'SourceCode', '|', 'Undo', 'Redo']
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

  quickToolbarSettings: QuickToolbarSettingsModel = {
    enable:true,
    showOnRightClick:true,

    image: [
        'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-',
        'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension'
    ],
    table:['tableHeader', 'tableRows', 'tableColumns', 'backgroundColor', 'tableRemove', 'alignments', 'tableCellVerticalAlign', 'styles']
  };

  getHTML = () => this.RTE.getHtml();
  setContent = (content) => this.RTE.value = content;
}
