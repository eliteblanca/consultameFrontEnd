import { Component, OnInit, Input } from '@angular/core';
import { category } from "../categories/categories.component";
import { CategoriesApiService } from "../../api/categories-api.service";
@Component({
    selector: 'app-categories-editor',
    templateUrl: './categories-editor.component.html',
    styleUrls: ['./categories-editor.component.css']
})
export class CategoriesEditorComponent implements OnInit {

    @Input() categories: category[];
    @Input() sublineSelected: string;
    @Input() group: string;

    icon: string = "icono de prueba";

    constructor(private categoriesApi: CategoriesApiService) { }

    ngOnInit() {
        console.log(this.categories)
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
            console.log(newCategory)
            let { sublinea, ...newCat } = newCategory;
            let categoryToAdd = { subcategories: [], ...newCat };
            this.categories.push(categoryToAdd);
        })
    }
}