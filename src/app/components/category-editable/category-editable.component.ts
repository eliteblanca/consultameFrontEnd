import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { category } from "../categories/categories.component";
import { CategoriesApiService } from "../../api/categories-api.service";
import arrow_drop_down from '@iconify/icons-mdi/arrow-drop-down';
import arrow_drop_up from '@iconify/icons-mdi/arrow-drop-up';
import pencil from '@iconify/icons-mdi/pencil';
import trash from '@iconify/icons-mdi/trash';
import plus_circle from '@iconify/icons-mdi/plus-circle';
import { ModalService } from "../../services/modal.service";
import { ArticlesApiService } from "../../api/articles-api.service";
import { filter, map, switchMap, window } from 'rxjs/operators';
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

    constructor(
        private categoriesApi: CategoriesApiService,
        private articlesApi:ArticlesApiService
    )  {  }

    @Input() category: category;
    @Input() sublineSelected: string;
    @Output() onCategoryDeleted = new EventEmitter();
    @Output() onCategorySelected = new EventEmitter();

    public desplegado = false;

    public editCategoryNameMode = false;
    public addCategoryMode = false;
    public iconPickerOpen = false;

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

        this.articlesApi.getArticlesByCategory(this.category.id).pipe(
            filter(articles => {
                return articles.length <= 0
            }),
            switchMap((articles) => this.categoriesApi.addCategory({
                group: this.category.id,
                icon: 'mdi:circle-small',
                name: nombre,
                position: 1,
                sublinea: this.sublineSelected
            }))
        ).subscribe(newCategory => {
            let { sublinea, ...categ } = newCategory;
            this.category.subcategories.push({ subcategories: [], ...categ })
        })

    }

    getIcon(){
        //* retorna 'mdi:circle-small' solo en esta vista en la vista de agente debe mostrar mdi:circle-small cuando no tenga icono
        if(this.category.icon == 'mdi:circle-small'){
            return 'mdi:image-plus'
        }else{
            return this.category.icon
        }
    }

    showIconPicker(){
        this.iconPickerOpen = true;
    }

    updateIcon(iconName:string){
        this.categoriesApi.updateCategory(
            this.category.id,
            {
                icon: iconName,
                name: this.category.name,
                position: this.category.position
            }
        ).subscribe(Response => {
            this.category.icon = iconName;
            console.log(this.category)
        })
    }

    seleccionarCategoria(category?:category){
        if(!!!category){
            if(!!!this.category.subcategories.length){
                this.onCategorySelected.next(this.category)
            }
        }else{
            this.onCategorySelected.next(category)
        }                
    }
}