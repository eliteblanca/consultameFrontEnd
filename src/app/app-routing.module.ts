import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { ArticleCreatorComponent } from "./components/article-creator/article-creator.component";
import { BaseDatosComponent } from "./components/base-datos/base-datos.component";
import { EdicionComponent } from "./components/edicion/edicion.component";
import { FavoritesComponent } from "./components/favorites/favorites.component";
import { FullScreenComponent } from "./components/full-screen/full-screen.component";
import { AplicationComponent, ArticleViewComponent, ExplorarComponent, LoginComponent, SearchComponent } from "./components/index";
import { IndicadoresComponent } from "./components/indicadores/indicadores.component";
import { NewsCreatorComponent } from "./components/news-creator/news-creator.component";
import { NewsEditorComponent } from "./components/news-editor/news-editor.component";
import { NewsViewComponent } from "./components/news-view/news-view.component";
import { NewsComponent } from "./components/news/news.component";
import { ReportsComponent } from "./components/reports/reports.component";
import { UsersconfigComponent } from "./components/usersconfig/usersconfig.component";
import { ReporteComentariosComponent } from "./components/reporte-comentarios/reporte-comentarios.component";
import { AuthGuard, HomeGuard } from "./guards/index";
import { CanLeaveArticleGuard } from "./guards/leave.guard";
import { ReporteCambiosComponent } from "./components/reporte-cambios/reporte-cambios.component";


const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent, canActivate: [HomeGuard] },
	{ path: 'fullScreen/:id', component: FullScreenComponent, canActivate: [AuthGuard] },
	{
		path: 'app', component: AplicationComponent, canActivate: [AuthGuard],
		children: [
			{ path: 'search', component: SearchComponent },
			{ path: 'explore', component: ExplorarComponent },
			{ path: 'articles', redirectTo: 'explore' },
			{ path: 'articles/:id', component: ArticleViewComponent, canDeactivate: [CanLeaveArticleGuard] },
			{
				path: 'newseditor',
				component: NewsCreatorComponent,
				children: [
					{ path: ':id', component: NewsEditorComponent }
				]
			},
			{ path: 'news', component: NewsComponent },
			{ path: 'news/:id', component: NewsViewComponent },
			{ path: 'edicion', component: EdicionComponent },
			{ path: 'articlecreation', component: ArticleCreatorComponent },
			{ path: 'favorites', component: FavoritesComponent },
			{ path: 'users', component: UsersconfigComponent },
			{
				path: 'reports', component: ReportsComponent,
				children: [
					{ path: 'indicadores', component: IndicadoresComponent },
					{ path: 'basedatos', component: BaseDatosComponent },
					{ path: 'comentarios', component: ReporteComentariosComponent },
					{ path: 'cambios', component: ReporteCambiosComponent }
				]
			}
		]
	},
	{ path: '**', redirectTo: '' }
];

const routerOptions: ExtraOptions = {
	useHash: true,
	anchorScrolling: 'enabled',
	// ...any other options you'd like to use
};

@NgModule({
	imports: [RouterModule.forRoot(routes, routerOptions)],
	exports: [RouterModule]
})
export class AppRoutingModule { }