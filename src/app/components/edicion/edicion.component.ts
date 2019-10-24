import { Component, OnInit } from '@angular/core';
import { category,CategoriesApiService } from "../../api/categories-api.service";
import { EventsService } from "../../services/events.service";
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {

  constructor(
    private categoriesApi:CategoriesApiService,
    private EventsService:EventsService 
  ) { }

  public categorySelected:category;

  ngOnInit() {
    this.EventsService.onNewSelectedLine$.pipe(
      filter(selectedLine => !!selectedLine.line),
      switchMap(selectedLine => this.categoriesApi.getCategories( selectedLine.subLine.id ) )
    ).subscribe(categories => {
      this.categories = categories;
      this.categorySelected = undefined;
    })
  }

  public categories:category[] = [];

  categoriaSelecctionada(category:category){
    this.categorySelected = category;
  }

}