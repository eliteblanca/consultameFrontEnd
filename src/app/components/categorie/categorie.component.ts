import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { category, categoryRaw } from "../../api/categories-api.service";

@Component({
    selector: 'app-categorie',
    templateUrl: './categorie.component.html',
    styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
    constructor() { }

    @Input() category: categoryRaw;
    @Input() allCategories: categoryRaw[];
    @Input() mode: string;
    @Output() onCategorySelected = new EventEmitter();

    public editCategoryNameMode = false;
    public desplegado = false;

    ngOnInit() {  }

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
            if( this.mode == 'report' ){
                this.onCategorySelected.next(this.category)                
            } else {
                if (!!!this.getSubCategories().length) {
                    this.onCategorySelected.next(this.category)                    
                }
            }
        } else {
            this.onCategorySelected.next(category)
        }
    }

    getSubCategories(){
        return this.allCategories.filter(category => category.group == this.category.id)
    }

}