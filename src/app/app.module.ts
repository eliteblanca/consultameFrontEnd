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
import { ConfigComponent } from './components/config/config.component';
import { CategoriesEditorComponent } from './components/categories-editor/categories-editor.component';
import { CategoryEditableComponent } from './components/category-editable/category-editable.component';
import { LinesEditorComponent } from './components/lines-editor/lines-editor.component';
import { LineEditableComponent } from './components/line-editable/line-editable.component';
import { ButtonComponent } from './components/button/button.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { IconPickerComponent } from './components/icon-picker/icon-picker.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { IconComponent } from './components/icon/icon.component';
import { PagerComponent } from './components/pager/pager.component';
import { ModalComponent } from './components/modal/modal.component';
import { ArticlesEditorListComponent } from './components/articles-editor-list/articles-editor-list.component';
import { ArticleEditableComponent } from './components/article-editable/article-editable.component';
import { ArticleCreatorComponent } from './components/article-creator/article-creator.component';
import { UsersAdminComponent } from './components/users-admin/users-admin.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { UsersEditorListComponent } from './components/users-editor-list/users-editor-list.component';
import { LinesAllowedComponent } from './components/lines-allowed/lines-allowed.component';
import { LineAllowedComponent } from './components/line-allowed/line-allowed.component';
import { LinesAllowedEditorComponent } from './components/lines-allowed-editor/lines-allowed-editor.component';
import { LineAllowedEditorComponent } from './components/line-allowed-editor/line-allowed-editor.component';

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
        ConfigComponent,
        CategoriesEditorComponent,
        CategoryEditableComponent,
        LinesEditorComponent,
        LineEditableComponent,
        ButtonComponent,
        TextInputComponent,
        IconPickerComponent,
        DropDownComponent,
        IconComponent,
        PagerComponent,
        ModalComponent,
        ArticlesEditorListComponent,
        ArticleEditableComponent,
        ArticleCreatorComponent,
        UsersAdminComponent,
        SearchInputComponent,
        UsersEditorListComponent,
        LinesAllowedComponent,
        LineAllowedComponent,
        LinesAllowedEditorComponent,
        LineAllowedEditorComponent
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
