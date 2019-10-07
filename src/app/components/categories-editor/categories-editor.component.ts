import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriesApiService, category } from "../../api/categories-api.service";
import { ModalService } from "../../services/modal.service";
@Component({
    selector: 'app-categories-editor',
    templateUrl: './categories-editor.component.html',
    styleUrls: ['./categories-editor.component.css']
})
export class CategoriesEditorComponent implements OnInit {

    @Output() onCategorySelected = new EventEmitter();
    @Input() categories: category[];
    @Input() sublineSelected: string;
    @Input() group: string;

    public nuevaCategoriaMode = false;

    private icon = 'mdi:circle-small';

    constructor(
        private categoriesApi: CategoriesApiService,
        private modalService: ModalService
    ) { }

    ngOnInit() {
    }

    agregarNuevaCategoria(nombre: string) {
        var category;
        if (!!this.group) {
            category = {
                group: this.group,
                icon: this.icon,
                position: 1,
                name: nombre,
                sublinea: this.sublineSelected
            };
        } else {
            category = {
                icon: this.icon,
                position: 1,
                name: nombre,
                sublinea: this.sublineSelected
            }
        }

        this.categoriesApi.addCategory(category).subscribe(newCategory => {
            let { sublinea, ...newCat } = newCategory;
            let categoryToAdd = { subcategories: [], ...newCat };
            this.categories.push(categoryToAdd);
        })
    }

    categoryDeleted(categoryId: string) {
        this.categories = this.categories.filter(category => category.id != categoryId)
    }

    seleccionarCategoria(category:category) {
        this.onCategorySelected.next(category)
    }

}