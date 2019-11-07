import { Component, OnInit } from '@angular/core';
import { CategoriesApiService, category } from "../../api/categories-api.service";
import { ArticlesApiService, } from "../../api/articles-api.service";
import { Article } from "../../article";
import { EventsService } from "../../services";
import { filter, switchMap } from 'rxjs/operators';
import { UserApiService, AllowedLines } from "../../api/user-api.service";
import { UserService } from 'src/app/services';
import { PcrcApiService, cliente } from "../../api/pcrc-api.service";

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

    public clientes: cliente[];
    public categories: category[] = [];
    public articles: Article[] = [];
    public selectedPcrc: string;
    public selectedCategory: string;

    constructor(
        private categoriesApi: CategoriesApiService,
        public userService: UserService,
        private pcrcApi:PcrcApiService,
    ) { }

    ngOnInit() {
        this.pcrcApi.getUserPcrc(this.userService.usuario.sub).subscribe(clientes => {
            this.clientes = clientes;
        })

        // this.userApi.getUserAllowedlines(this.userService.usuario.sub)
        //     .pipe(
        //         filter(lines => !!lines && !!lines[0] && !!lines[0].sublines[0])
        //     ).subscribe(lines => {
        //         this.lines = lines;
        //     })

    }

    onPcrcSelected(sublineId: string) {
        if (this.selectedPcrc != sublineId) {
            this.selectedPcrc = sublineId;
            this.categoriesApi.getCategories(sublineId).subscribe(categories => {
                this.categories = categories;
                this.selectedCategory = undefined;
            })
        }
    }

    onCategorySelected(category: category) {
        if (this.selectedCategory != category.id) {
            this.selectedCategory = category.id;
        }
    }
    
    private reset(){
        this.selectedPcrc = undefined;
        this.selectedCategory = undefined;
        this.categories = [];
        this.articles = [];
    }
}