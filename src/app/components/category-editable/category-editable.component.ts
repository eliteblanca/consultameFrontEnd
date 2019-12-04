import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { ArticlesApiService } from "../../api/articles-api.service";
import { CategoriesApiService, category, categoryRaw } from "../../api/categories-api.service";
import { StateService } from "../../services/state.service";
@Component({
    selector: 'app-category-editable',
    templateUrl: './category-editable.component.html',
    styleUrls: ['./category-editable.component.css']
})
export class CategoryEditableComponent implements OnInit {

    constructor(
        private categoriesApi: CategoriesApiService,
        private articlesApi:ArticlesApiService,
        private state:StateService
    )  {  }

    @Input() category: categoryRaw;
    @Input() allCategories: categoryRaw[];
    @Output() onCategoryDeleted = new EventEmitter();
    @Output() onCategorySelected = new EventEmitter();

    public desplegado = false;
    public editCategoryNameMode = false;
    public addCategoryMode = false;
    public deleteCategoryModalOpen = false;
    public iconPickerOpen = false;
    public deleteCategorySpinner = false;

    ngOnInit() {
    }

    desplegarSubCategorias() {
        this.desplegado = !this.desplegado;
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
        this.deleteCategorySpinner = true;
        this.categoriesApi.deleteCategory(this.category.id).subscribe(result => {
            this.deleteCategorySpinner = false;
            this.onCategoryDeleted.next(this.category.id)
        });
    }

    subCategoriaEliminada(subategoryId: string) {
        this.allCategories = this.allCategories.filter(category => category.id != subategoryId)
    }

    agregarCategoria(nombre: string) {
        this.articlesApi.getArticlesByCategory(this.category.id).pipe(
            filter(articles => {
                return articles.length <= 0
            }),
            switchMap(articles => this.categoriesApi.addCategory({
                group: this.category.id,
                icon: 'mdi:circle-small',
                name: nombre,
                position: 1,
                pcrc: this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString()
            }))
        ).subscribe(newCategory => {
            this.allCategories.push( newCategory )
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
        })
    }

    seleccionarCategoria(category?:category){
        if(!!!category){
            if(!!!this.getSubCategories().length){
                this.onCategorySelected.next(this.category)
            }
        }else{
            this.onCategorySelected.next(category)
        }                
    }

    getSubCategories(){
        return this.allCategories.filter(category => category.group == this.category.id)
    }

}