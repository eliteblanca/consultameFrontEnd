import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { category } from "../categories/categories.component";
import { CategoriesApiService } from "../../api/categories-api.service";
import arrow_drop_down from '@iconify/icons-mdi/arrow-drop-down';
import arrow_drop_up from '@iconify/icons-mdi/arrow-drop-up';
import pencil from '@iconify/icons-mdi/pencil';
import trash from '@iconify/icons-mdi/trash';
import plus_circle from '@iconify/icons-mdi/plus-circle';

@Component({
    selector: 'app-category-editable',
    templateUrl: './category-editable.component.html',
    styleUrls: ['./category-editable.component.css']
})
export class CategoryEditableComponent implements OnInit {
    //*icons
    public arrow_icon = arrow_drop_down;
    public edit_icon = pencil;
    public delete_icon = trash;
    public add_icon = plus_circle;
    //*icons

    constructor(private categoriesApi: CategoriesApiService) { }

    @Input() category: category;
    @Input() sublineSelected: string;
    @Output() onCategoryDeleted = new EventEmitter();
    @Output() onCategorySelected = new EventEmitter();

    public desplegado = false;

    public editCategoryNameMode = false;
    public addCategoryMode = false;

    ngOnInit() {
    }

    desplegarSubCategorias() {
        this.desplegado = !this.desplegado;
        this.arrow_icon = this.desplegado ? arrow_drop_up : arrow_drop_down;
    }

    actualizarNombre(nuevoNombre: string) {
        this.categoriesApi.updateCategory(
            this.category.id,
            {
                icon: this.category.icon,
                name: nuevoNombre,
                position: this.category.position
            }
        ).subscribe(Response => {
            this.category.name = nuevoNombre;
        })
    }

    eliminarCategoria() {
        this.categoriesApi.deleteCategory(this.category.id).subscribe(result => {
            this.onCategoryDeleted.next(this.category.id)
        });
    }

    subCategoriaEliminada(subategoryId: string) {
        this.category.subcategories = this.category.subcategories.filter(subcategory => subcategory.id != subategoryId)
    }

    agregarCategoria(nombre: string) {
        this.categoriesApi.addCategory({
            group: this.category.id,
            icon: 'icono de prueba',
            name: nombre,
            position: 1,
            sublinea: this.sublineSelected
        }).subscribe(newCategory => {
            let { sublinea, ...categ } = newCategory;
            this.category.subcategories.push({ subcategories: [], ...categ })
        })
    }
}