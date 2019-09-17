import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

export type category = {
    id: string;
    name: string;
    position: number;
    icon: string;
    group: string;
    subcategories?: category[]
}

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    @Output() onSelected: EventEmitter<string> = new EventEmitter();
    @Input() categories: category[];

    categoriaSeleccionada(categoria: string) {
        this.onSelected.emit(categoria);
    }

    constructor() { }

    ngOnInit() { }
}