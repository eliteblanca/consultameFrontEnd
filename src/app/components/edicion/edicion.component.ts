import { Component, OnInit } from '@angular/core';
import { LinesApiService, lineWithSublines } from "../../api/lines-api.service";
import { CategoriesApiService, category } from "../../api/categories-api.service";
@Component({
    selector: 'app-edicion',
    templateUrl: './edicion.component.html',
    styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {

    private prueba = "asdas";

    private lines: lineWithSublines[];
    private categories: category[] = [];
    private selectedSubline: string;
    constructor(
        private linesApi: LinesApiService,
        private categoriesApi: CategoriesApiService
    ) { }

    ngOnInit() {
        this.linesApi.getLines().subscribe(lines => {
            this.lines = lines;
        })
    }

    onLineSelected(sublineId) {
        this.selectedSubline = sublineId;
        this.categoriesApi.getCategories(sublineId).subscribe(categories => {
            console.log(categories)
            this.categories = categories;

        })
    }
}