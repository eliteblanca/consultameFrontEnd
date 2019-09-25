import { Component, OnInit } from '@angular/core';
import { LinesApiService, lineWithSublines } from "../../api/lines-api.service";
import { CategoriesApiService, category } from "../../api/categories-api.service";
import { ArticlesApiService, } from "../../api/articles-api.service";
import { Article } from "../../article";
@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

    public lines: lineWithSublines[];
    public categories: category[] = [];
    public articles: Article[] = [];
    public selectedSubline: string;
    public selectedCategory: string;

    constructor(
        private linesApi: LinesApiService,
        private categoriesApi: CategoriesApiService,
        private articlesApi: ArticlesApiService
    ) { }

    ngOnInit() {
        this.linesApi.getLines().subscribe(lines => {
            this.lines = lines;
        })
    }

    onSubLineSelected(sublineId: string) {
        if (this.selectedSubline != sublineId) {
            this.selectedSubline = sublineId;
            this.categoriesApi.getCategories(sublineId).subscribe(categories => {
                this.categories = categories;
            })
        }
    }

    onCategorySelected(category: category) {
        if (this.selectedCategory != category.id) {
            this.selectedCategory = category.id;
        }
    }

    onLineDelete(lineId: string) {
        let LineDeleted = this.lines.find(line => line.id == lineId)
        let contieneSublinea = LineDeleted.sublines.some(subline => subline.id == this.selectedSubline)
        if (contieneSublinea) {
            this.reset()
        }
    }

    onSubLineDeleted(sublineId: string) {
        if (this.selectedSubline == sublineId) {
            this.reset()
        }
    }
    
    private reset(){
        this.selectedSubline = undefined;
        this.selectedCategory = undefined;
        this.categories = [];
        this.articles = [];
    }
}