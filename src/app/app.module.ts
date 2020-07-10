import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from "@visurel/iconify-angular";
import { AppRoutingModule } from './app-routing.module';
import { QuillModule } from 'ngx-quill';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMasonryModule } from 'ngx-masonry';
import { AutosizeModule } from 'ngx-autosize';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { UploaderModule  } from '@syncfusion/ej2-angular-inputs';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TooltipModule } from 'ng2-tooltip-directive';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { NgPipesModule } from 'ngx-pipes';
import { RecaptchaModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';

import { AppComponent } from './app.component';
import { ArticleCreatorComponent } from './components/article-creator/article-creator.component';
import { ArticleEditableComponent } from './components/article-editable/article-editable.component';
import { ButtonComponent } from './components/button/button.component';
import { CategoriesEditorComponent } from './components/categories-editor/categories-editor.component';
import { CategoryEditableComponent } from './components/category-editable/category-editable.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { IconPickerComponent } from './components/icon-picker/icon-picker.component';
import { IconComponent } from './components/icon/icon.component';
import { AplicationComponent, ArticleComponent, ArticleListComponent, ArticleViewComponent, CategorieComponent, CategoriesComponent, ExplorarComponent, HeaderComponent, HomeComponent, LoginComponent, SearchBoxComponent, SearchComponent } from './components/index';
import { ModalComponent } from './components/modal/modal.component';
import { PagerComponent } from './components/pager/pager.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { UsersEditorListComponent } from './components/users-editor-list/users-editor-list.component';
import { JwtInterceptor } from "./services/index";
import { EdicionComponent } from './components/edicion/edicion.component';
import { RichTextEditorComponent } from './components/rich-text-editor/rich-text-editor.component';
import { RTEViewComponent } from './components/rteview/rteview.component';
import { NewsCreatorComponent } from './components/news-creator/news-creator.component';
import { NewsListEditableComponent } from './components/news-list-editable/news-list-editable.component';
import { NewsComponent } from './components/news/news.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentComponent } from './components/comment/comment.component';
import { ArticlePrevComponent } from './components/file-prev/file-prev.component';
import { UserRoleIsDirective } from './user-role-is.directive';
import { SideSheetComponent } from './components/side-sheet/side-sheet.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';
import { TreeViewRowComponent } from './components/tree-view-row/tree-view-row.component';
import { LoadingPipe } from './pipes/loading.pipe';
import { UsersconfigComponent } from './components/usersconfig/usersconfig.component';
import { TreeViewMultiComponent } from './components/tree-view-multi/tree-view-multi.component';
import { TreeViewMultiRowComponent } from './components/tree-view-multi-row/tree-view-multi-row.component';
import { FullScreenComponent } from './components/full-screen/full-screen.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CardComponent } from './components/categories-report/card/card.component';
import { CheckBoxComponent } from './components/check-box/check-box.component';
import { ReportsComponent } from './components/reports/reports.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { CategoriesReportComponent } from './components/categories-report/categories-report.component';
import { ShortArticleListComponent } from './components/short-article-list/short-article-list.component';
import { NewsEditorComponent } from './components/news-editor/news-editor.component';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { BaseDatosComponent } from './components/base-datos/base-datos.component';
import { ReporteComentariosComponent } from './components/reporte-comentarios/reporte-comentarios.component';
import { ReporteCambiosComponent } from './components/reporte-cambios/reporte-cambios.component';
import { ArticleplaceholderComponent } from './components/articleplaceholder/articleplaceholder.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SlideCaptchaComponent } from './components/slide-captcha/slide-captcha.component';
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
        CategoriesEditorComponent,
        CategoryEditableComponent,
        ButtonComponent,
        TextInputComponent,
        IconPickerComponent,
        DropDownComponent,
        IconComponent,
        PagerComponent,
        ModalComponent,
        ArticleEditableComponent,
        ArticleCreatorComponent,
        SearchInputComponent,
        UsersEditorListComponent,
        EdicionComponent,
        RichTextEditorComponent,
        RTEViewComponent,
        NewsCreatorComponent,
        NewsListEditableComponent,
        NewsComponent,
        NewsListComponent,
        NewsCardComponent,
        FavoritesComponent,
        CommentListComponent,
        CommentComponent,
        ArticlePrevComponent,
        UserRoleIsDirective,
        SideSheetComponent,
        TreeViewComponent,
        TreeViewRowComponent,
        LoadingPipe,
        UsersconfigComponent,
        TreeViewMultiComponent,
        TreeViewMultiRowComponent,
        FullScreenComponent,
        SpinnerComponent,
        CardComponent,
        CheckBoxComponent,
        ReportsComponent,
        EventosComponent,
        CategoriesReportComponent,
        ShortArticleListComponent,
        NewsEditorComponent,
        IndicadoresComponent,
        BaseDatosComponent,
        ReporteComentariosComponent,
        ReporteCambiosComponent,
        ArticleplaceholderComponent,
        NotificationsComponent,
        NotificationComponent,
        SlideCaptchaComponent        
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        IconModule,
        QuillModule.forRoot(),
        CalendarModule,
        InfiniteScrollModule,
        NgxMasonryModule,
        AutosizeModule,
        NgScrollbarModule,
        PickerModule,
        UploaderModule,
        RadioButtonModule,
        TooltipModule,
        GridModule,
        NgPipesModule,
        RecaptchaModule,
        BrowserAnimationsModule
    ],
    providers: [
        JwtInterceptor,
        {
            provide: RECAPTCHA_LANGUAGE,
            useValue: 'es'
        }        
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}