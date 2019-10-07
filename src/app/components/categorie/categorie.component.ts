import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { category } from "../../api/categories-api.service";
import { ArticlesApiService } from '../../api/articles-api.service';

@Component({
    selector: 'app-categorie',
    templateUrl: './categorie.component.html',
    styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
    constructor() { }

    @Input() category: category;
    @Output() onCategorySelected = new EventEmitter();

    public desplegado = false;

    ngOnInit() {
    }

    getIcon() {
        //* retorna 'mdi:circle-small' solo en esta vista en la vista de agente debe mostrar mdi:circle-small cuando no tenga icono
        if (this.category.icon == 'mdi:circle-small') {
            return 'mdi:image-plus'
        } else {
            return this.category.icon
        }
    }

    seleccionarCategoria(category?: category) {
        if (!!!category) {
            if (!!!this.category.subcategories.length) {
                this.onCategorySelected.next(this.category)
            }
        } else {
            this.onCategorySelected.next(category)
        }
    }
}