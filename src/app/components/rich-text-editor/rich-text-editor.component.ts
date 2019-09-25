import { Component, OnInit } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, TableService,QuickToolbarSettingsModel  } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css'],
  providers: [ToolbarService, HtmlEditorService,TableService, QuickToolbarService, ImageService, LinkService ]
})
export class RichTextEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }



  public tools = {
    enableFloating: true,
    type: 'Expand',
    items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
    'LowerCase', 'UpperCase', '|',
    'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
    'Outdent', 'Indent', '|',
    'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
    'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
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

}
