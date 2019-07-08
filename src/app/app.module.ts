//#region imports 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgMasonryGridModule  } from 'ng-masonry-grid';

import { AppComponent } from './app.component';
import { ExplorarComponent } from './explorar/explorar.component';
import { HeaderComponent } from './header/header.component';
import { SearchBoxComponent } from './search-box/search-box.component';

import { SearchComponent } from './search/search.component';

import { mockServerService } from "./services/index";
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AplicationComponent } from './aplication/aplication.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ArticleListComponent } from './article-list/article-list.component';

////#endregion imports
@NgModule({
  declarations: [
    AppComponent,
    ExplorarComponent,
    HeaderComponent,
    SearchBoxComponent,
    SearchComponent,
    ArticleComponent,
    HomeComponent,
    LoginComponent,
    AplicationComponent,
    CategoriesComponent,
    CategorieComponent,
    ArticleListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgMasonryGridModule
  ],
  providers: [ 
    mockServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
