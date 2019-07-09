import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { 
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
  ArticleListComponent,
  ArticleViewComponent } from './components/index';

import { mockServerService } from "./services/index";

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
    ArticleListComponent,
    ArticleViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ 
    mockServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
