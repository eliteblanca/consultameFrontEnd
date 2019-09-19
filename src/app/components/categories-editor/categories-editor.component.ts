import { Component, OnInit, Input } from '@angular/core';
import { category } from "../categories/categories.component";
import { CategoriesApiService } from "../../api/categories-api.service";
import { ModalService } from "../../services/modal.service";
@Component({
    selector: 'app-categories-editor',
    templateUrl: './categories-editor.component.html',
    styleUrls: ['./categories-editor.component.css']
})
export class CategoriesEditorComponent implements OnInit {

    @Input() categories: category[];
    @Input() sublineSelected: string;
    @Input() group: string;

    public nuevaCategoriaMode = false;
    private icon = 'sin icono';
    constructor(
        private categoriesApi: CategoriesApiService,
        private modalService: ModalService
    ) { }

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

    categoryDeleted(categoryId: string) {
        this.categories = this.categories.filter(category => category.id != categoryId)
    }

    abrirModal(){
        this.modalService.open('iconPickerCategories_1');
    }

    // openModal(id: string) {
    //     this.modalService.open(id);
    // }

    // closeModal(id: string) {
    //     this.modalService.close(id);
    // }

}