import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
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
  ArticleViewComponent,
  AcountMenuComponent,
  NewsComponent
 } from './components/index';

import { mockServerService, JwtInterceptor } from "./services/index";

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
    ArticleViewComponent,
    AcountMenuComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ 
    JwtInterceptor,
    mockServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
