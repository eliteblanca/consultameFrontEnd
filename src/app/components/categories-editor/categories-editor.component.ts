import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CategoriesApiService, category, categoryRaw } from "../../api/categories-api.service";
import { StateService } from "../../services/state.service";

@Component({
    selector: 'app-categories-editor',
    templateUrl: './categories-editor.component.html',
    styleUrls: ['./categories-editor.component.css']
})
export class CategoriesEditorComponent implements OnInit {

    @Output() onCategorySelected = new EventEmitter();

    public nuevaCategoriaMode = false;

    private icon = 'mdi:circle-small';

    constructor(
        private categoriesApi: CategoriesApiService,
        public state:StateService
    ) { }

    ngOnInit() { }

    agregarNuevaCategoria(nombre: string) {
        this.state.selectedPcrc$.pipe(
            tap(({id_dp_pcrc}) => {

                this.categoriesApi.addCategory({
                    icon: this.icon,
                    position: 1,
                    name: nombre,
                    pcrc: id_dp_pcrc.toString()
                }).subscribe(newCategory => {
                    this.state.addCategory({ subcategories: [], ...newCategory })
                })
            })
        ).subscribe()
    }

    categoryDeleted(categoryId: string) {
        // this.categories = this.categories.filter(category => category.id != categoryId)
    }

    seleccionarCategoria(category:category) {
        this.onCategorySelected.next(category)
    }

    getFirstCategories(categories:categoryRaw[]){
        return categories.filter(category => !!!category.group)
    }

}