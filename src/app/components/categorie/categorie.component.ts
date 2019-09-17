import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { category } from "../categories/categories.component";

@Component({
    selector: 'app-categorie',
    templateUrl: './categorie.component.html',
    styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

    @Output() onSelected: EventEmitter<string> = new EventEmitter();
    @Input() public category: category;

    constructor() { }

    ngOnInit() {
    }

    categoriaSeleccionada(categoria?: string): void {
        if (typeof categoria == 'undefined') {
            this.onSelected.emit(this.category.id);
        } else {
            this.onSelected.emit(categoria);
        }
    }

}