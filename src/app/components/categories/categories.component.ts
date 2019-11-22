import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { category } from '../../api/categories-api.service';
import { categoryRaw } from "../../api/categories-api.service";
import { StateService } from "../../services/state.service";
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    @Output() onCategorySelected = new EventEmitter();
    @Input() group: string;

    public nuevaCategoriaMode = false;

    private icon = 'mdi:circle-small';

    constructor(public state: StateService) {  }

    ngOnInit() {  }

    seleccionarCategoria(category:category) {
        this.onCategorySelected.next(category)
    }

    getFirstCategories(categories:categoryRaw[]){
        return categories.filter(category => !!!category.group)
    }
    
}