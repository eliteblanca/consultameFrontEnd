import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-drop-down',
    templateUrl: './drop-down.component.html',
    styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {

    constructor() { }

    @Input() textoInicial: string;
    @Input() textField: string;
    @Input() values: any = [];

    @Output() onValueSelected = new EventEmitter();

    seleccion: any;

    unfolded: boolean = false;

    ngOnInit() {  }

    seleccionar(seleccion: any) {
        this.seleccion = seleccion;
        this.onValueSelected.next(seleccion)
    }

    getSelection() {
        let selectedText;
        if (!!this.seleccion) {
            if (!!this.textField) {
                selectedText = this.seleccion[this.textField]
            } else {
                selectedText = this.seleccion
            }
        } else if (this.textoInicial) {
            selectedText = this.textoInicial;
        } else {
            if (!!this.textField) {
                selectedText = this.values[0][this.textField]
            } else {
                selectedText = this.values[0]
            }
        }
        return selectedText;
    }
}