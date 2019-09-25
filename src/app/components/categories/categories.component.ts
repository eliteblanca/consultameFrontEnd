import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CategoriesApiService } from '../../api/categories-api.service';

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

    @Output() onCategorySelected = new EventEmitter();
    @Input() categories: category[];
    @Input() sublineSelected: string;
    @Input() group: string;

    public nuevaCategoriaMode = false;

    private icon = 'mdi:circle-small';

    constructor(
        private categoriesApi: CategoriesApiService,
    ) { }

    ngOnInit() {
        console.log(this.categories)
    }

    seleccionarCategoria(category:category) {
        this.onCategorySelected.next(category)
    }

}