import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IconModule } from "@visurel/iconify-angular";
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ArticleCreatorComponent } from './components/article-creator/article-creator.component';
import { ArticleEditableComponent } from './components/article-editable/article-editable.component';
import { ArticlesEditorListComponent } from './components/articles-editor-list/articles-editor-list.component';
import { ButtonComponent } from './components/button/button.component';
import { CategoriesEditorComponent } from './components/categories-editor/categories-editor.component';
import { CategoryEditableComponent } from './components/category-editable/category-editable.component';
import { ConfigComponent } from './components/config/config.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { IconPickerComponent } from './components/icon-picker/icon-picker.component';
import { IconComponent } from './components/icon/icon.component';
import { AcountMenuComponent, AplicationComponent, ArticleComponent, ArticleListComponent, ArticleViewComponent, CategorieComponent, CategoriesComponent, ExplorarComponent, HeaderComponent, HomeComponent, LoginComponent, NewsComponent, SearchBoxComponent, SearchComponent } from './components/index';
import { LineAllowedEditorComponent } from './components/line-allowed-editor/line-allowed-editor.component';
import { LineAllowedComponent } from './components/line-allowed/line-allowed.component';
import { LineEditableComponent } from './components/line-editable/line-editable.component';
import { LinesAllowedEditorComponent } from './components/lines-allowed-editor/lines-allowed-editor.component';
import { LinesAllowedComponent } from './components/lines-allowed/lines-allowed.component';
import { LinesEditorComponent } from './components/lines-editor/lines-editor.component';
import { ModalComponent } from './components/modal/modal.component';
import { PagerComponent } from './components/pager/pager.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { UsersAdminComponent } from './components/users-admin/users-admin.component';
import { UsersEditorListComponent } from './components/users-editor-list/users-editor-list.component';
import { JwtInterceptor, mockServerService } from "./services/index";
import { EdicionComponent } from './components/edicion/edicion.component';
import { RichTextEditorComponent } from './components/rich-text-editor/rich-text-editor.component';
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
        LineAllowedEditorComponent,
        EdicionComponent,
        RichTextEditorComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        IconModule,
        RichTextEditorAllModule
    ],
    providers: [
        JwtInterceptor,
        mockServerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }