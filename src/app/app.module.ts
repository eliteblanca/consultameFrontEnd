import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IconModule } from "@visurel/iconify-angular";

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
import { EdicionComponent } from './components/edicion/edicion.component';
import { CategoriesEditorComponent } from './components/categories-editor/categories-editor.component';
import { CategoryEditableComponent } from './components/category-editable/category-editable.component';
import { LinesEditorComponent } from './components/lines-editor/lines-editor.component';
import { LineEditableComponent } from './components/line-editable/line-editable.component';
import { ButtonComponent } from './components/button/button.component';
import { TextInputComponent } from './components/text-input/text-input.component';

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
        NewsComponent,
        EdicionComponent,
        CategoriesEditorComponent,
        CategoryEditableComponent,
        LinesEditorComponent,
        LineEditableComponent,
        ButtonComponent,
        TextInputComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        IconModule
    ],
    providers: [
        JwtInterceptor,
        mockServerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
