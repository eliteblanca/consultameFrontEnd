import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { SearchComponent, ExplorarComponent, HomeComponent, AplicationComponent, LoginComponent, ArticleViewComponent } from "./components/index";
import { AuthGuard, HomeGuard } from "./guards/index";
import { EdicionComponent } from "./components/edicion/edicion.component";
import { ArticleCreatorComponent } from "./components/article-creator/article-creator.component";
import { NewsCreatorComponent } from "./components/news-creator/news-creator.component";
import { NewsComponent } from "./components/news/news.component";
import { NewsViewComponent } from "./components/news-view/news-view.component";
import { FavoritesComponent } from "./components/favorites/favorites.component";
import { UsersconfigComponent } from "./components/usersconfig/usersconfig.component";
import { FullScreenComponent } from "./components/full-screen/full-screen.component";
import { ReportsComponent } from "./components/reports/reports.component";
import { IndicadoresComponent } from "./components/indicadores/indicadores.component";

import { NewsEditorComponent } from "./components/news-editor/news-editor.component";

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
			{ path: 'articles/:id', component: ArticleViewComponent },
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
					{ path: 'indicadores', component: IndicadoresComponent }
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