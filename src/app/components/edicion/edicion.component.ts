import { Component, OnInit } from '@angular/core';
import { CategoriesApiService, category } from "../../api/categories-api.service";
import { cliente } from "../../api/pcrc-api.service";
import { Article } from "../../article";
import { StateService } from "../../services/state.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {

  public clientes: cliente[];
  public articles: Article[] = [];
  public selectedCategory: string;
  public categories:Observable<category[]>

  constructor(
    private categoriesApi: CategoriesApiService,
    public state:StateService
  ) { }

  ngOnInit() {  }

  onCategorySelected(category: category) {
    if (this.selectedCategory != category.id) {
      this.selectedCategory = category.id;
    }
  }

  private reset(){
    this.selectedCategory = undefined;
    this.articles = [];
  }
}