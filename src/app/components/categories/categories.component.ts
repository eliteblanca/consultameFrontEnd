import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CategoriesApiService,category } from '../../api/categories-api.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    @Output() onCategorySelected = new EventEmitter();
    @Input() categories: category[];
    @Input() group: string;

    public nuevaCategoriaMode = false;

    private icon = 'mdi:circle-small';

    constructor(
        private categoriesApi: CategoriesApiService,
    ) { }

    ngOnInit() {
    }

    seleccionarCategoria(category:category) {
        this.onCategorySelected.next(category)
    }
}