import { Component, OnInit } from '@angular/core';
import { CategoriesApiService, category, categoryRaw } from "../../api/categories-api.service";
import { cliente } from "../../api/pcrc-api.service";
import { Article } from "../../article";
import { StateService } from "../../services/state.service";
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';
import { ArticlesApiService } from "../../api/articles-api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {

  public clientes: cliente[];
  public articles: Article[] = [];
  public borradores: Article[] = [];
  public categorySelected: category;
  public categories:Observable<category[]>

  private pagesize = 20;
  public articlesLoadingSpinner = true;
  public borradoresLoadingSpinner = true;
  public currentSearch = '';
  public currentSearchBorradores = '';

  constructor(
    public state:StateService,
    private articlesApi:ArticlesApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.state.selectedPcrc$.pipe(
      tap(pcrc => this.reset())
    ).subscribe()


  }

  loadMoreArticles(){
    this.articlesLoadingSpinner = true;
    this.articlesApi.getArticlesByCategory( 
      this.categorySelected.id, 'published',
      this.articles.length, this.pagesize,
      this.currentSearch
    ).pipe(
      tap( articles => {
        this.articles = this.articles.concat(articles);
        this.articlesLoadingSpinner = false;
      })
    ).subscribe()
  }

  loadMoreBorradores(){
    this.borradoresLoadingSpinner = true;
    this.articlesApi.getArticlesByCategory(
      this.categorySelected.id, 'archived',
      this.borradores.length, this.pagesize,
      this.currentSearchBorradores
    ).pipe(
      tap( articles => {
        this.borradores = this.borradores.concat(articles);
        this.borradoresLoadingSpinner = false;
      })
    ).subscribe()
  }

  onCategorySelected(category: category) {
    if(this.categorySelected){
      if (this.categorySelected.id != category.id) {
        this.categorySelected = category;
        this.articles = []
        this.loadMoreArticles()
        this.loadMoreBorradores()
      }
    } else {
      this.categorySelected = category;
      this.articles = []      
      this.loadMoreArticles()
      this.loadMoreBorradores()
    }
  }

  private reset(){
    this.categorySelected = undefined
    this.articles = []
    this.borradores = []
  }

  onCategoryDeleted(categoryId:string){

    this.state.newDeletedCategory(categoryId)

    let currentCat = Object.assign({}, this.categorySelected);

    if(currentCat.group == categoryId){
      this.reset()
    }    

    while (!!currentCat.group && currentCat.group != categoryId){
      currentCat = this.state.getValueOf('selectedPcrcCategories').value.find(cat => cat.id == currentCat.group)
      
      if(currentCat.group == categoryId){
        this.reset()
        return
      }
    }
  }

  search(text:string){
    this.articles = []
    this.currentSearch = text
    this.loadMoreArticles()
  }

  searchBorradores(text:string){
    this.borradores = []
    this.currentSearchBorradores = text
    this.loadMoreBorradores()
  }

  goToArticleCreation(){
    this.router.navigate(['/app/articlecreation'],{ queryParams: { category: this.categorySelected }, queryParamsHandling: 'merge' })
  }

  articuloEliminado(idArticulo:string){
    this.articles = this.articles.filter( article => article.id != idArticulo );
    this.articlesApi.getArticlesByCategory(
      this.categorySelected.id,
      'published',
      this.articles.length + 1, 1 
    ).subscribe( articles => {
      this.articles = this.articles.concat(articles);
    })
  }

  borradorEliminado(idArticulo:string){
    this.borradores = this.borradores.filter( article => article.id != idArticulo )
    this.articlesApi.getArticlesByCategory(
      this.categorySelected.id,
      'published',
      this.borradores.length + 1, 1 
    ).subscribe( articles => {
      this.borradores = this.borradores.concat(articles);
    })
  }

}