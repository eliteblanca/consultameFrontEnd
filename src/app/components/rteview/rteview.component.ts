import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Quill from 'quill';

@Component({
	selector: 'app-rteview',
	templateUrl: './rteview.component.html',
	styleUrls: ['./rteview.component.css']
})
export class RTEViewComponent implements OnInit, AfterViewInit {

	@ViewChild('RTE', { static: false }) RTE: ElementRef;

	editor: any;

	constructor() { }

	ngOnInit() {
	}

	setContent(content) {
		this.editor.setContents(content)
	}

	ngAfterViewInit() {
		this.editor = new Quill(this.RTE.nativeElement, this.options);
		// Add fonts to whitelist
	}

	setHtmlContent(htmlString){
		this.editor.clipboard.dangerouslyPasteHTML(htmlString)
	}

	modules = {
		toolbar: {
			enable: false
		}
	}

	options = {
		modules: this.modules,
		placeholder: 'Contenido del articulo ...',
		readOnly: true,
		theme: 'bubble'
	};

}
