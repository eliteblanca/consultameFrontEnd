import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import arrow_drop_down from '@iconify/icons-mdi/arrow-drop-down';
import arrow_drop_up from '@iconify/icons-mdi/arrow-drop-up';
import pencil from '@iconify/icons-mdi/pencil';
import plus_circle from '@iconify/icons-mdi/plus-circle';
import trash from '@iconify/icons-mdi/trash';
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
    //*icons
    public arrow_icon = arrow_drop_down;
    public edit_icon = pencil;
    public delete_icon = trash;
    public add_icon = plus_circle;
    //*icons

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
        this.allCategories = this.allCategories.filter(category => category.id != subategoryId)
    }

    agregarCategoria(nombre: string) {

        this.articlesApi.getArticlesByCategory(this.category.id).pipe(
            filter(articles => {
                return articles.length <= 0
            }),
            switchMap(articles => this.state.selectedPcrc$),
            switchMap(({id_dp_pcrc}) => this.categoriesApi.addCategory({
                group: this.category.id,
                icon: 'mdi:circle-small',
                name: nombre,
                position: 1,
                pcrc: id_dp_pcrc.toString()
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
            if(!!!this.category.subcategories.length){
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