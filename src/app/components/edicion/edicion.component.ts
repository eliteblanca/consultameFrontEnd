import { Component, OnInit } from '@angular/core';
import { CategoriesApiService, category, categoryRaw } from "../../api/categories-api.service";
import { cliente } from "../../api/pcrc-api.service";
import { Article } from "../../article";
import { StateService } from "../../services/state.service";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {

  public clientes: cliente[];
  public articles: Article[] = [];
  public selectedCategory: category;

  public categories:Observable<category[]>

  constructor(
    public state:StateService
  ) { }

  ngOnInit() {
    this.state.selectedPcrc$.pipe(
      tap(pcrc => this.reset())
    ).subscribe()
  }

  onCategorySelected(category: category) {
    if(this.selectedCategory){
      if (this.selectedCategory.id != category.id) {
        this.selectedCategory = category;
      }
    }else{
      this.selectedCategory = category;      
    }
  }

  private reset(){
    this.selectedCategory = undefined;
    this.articles = [];
  }

  onCategoryDeleted(categoryId:string){

    this.state.newDeletedCategory(categoryId)

    let currentCat = Object.assign({}, this.selectedCategory);

    if(currentCat.group == categoryId){
      this.selectedCategory = undefined;
    }    

    while (!!currentCat.group && currentCat.group != categoryId){
      currentCat = this.state.getValueOf('selectedPcrcCategories').value.find(cat => cat.id == currentCat.group)
      
      if(currentCat.group == categoryId){
        this.selectedCategory = undefined
        return
      }
    }
  }

}