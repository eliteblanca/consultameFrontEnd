import { Component, OnInit, Input } from '@angular/core';
import { category } from "../categories/categories.component";
import arrow_drop_down from '@iconify/icons-mdi/arrow-drop-down';
import arrow_drop_up from '@iconify/icons-mdi/arrow-drop-up';

@Component({
    selector: 'app-category-editable',
    templateUrl: './category-editable.component.html',
    styleUrls: ['./category-editable.component.css']
})
export class CategoryEditableComponent implements OnInit {
    //*icons
    public arrow_icon = arrow_drop_down;
    //*icons
    constructor() { }

    @Input() category: category;
    public desplegado = false;

    ngOnInit() {
    }

    desplegarSubCategorias() {
        this.desplegado = !this.desplegado;
        this.arrow_icon = this.desplegado ? arrow_drop_up : arrow_drop_down;
    }

}
