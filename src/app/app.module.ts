//#region imports 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ExplorarComponent } from './explorar/explorar.component';
import { HeaderComponent } from './header/header.component';
import { SearchBoxComponent } from './search-box/search-box.component';

import { SearchComponent } from './search/search.component';

import { mockServerService } from "./mock-back-end.service";
import { ArticleComponent } from './article/article.component';
////#endregion imports
@NgModule({
  declarations: [
    AppComponent,
    ExplorarComponent,
    HeaderComponent,
    SearchBoxComponent,
    SearchComponent,
    ArticleComponent
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
