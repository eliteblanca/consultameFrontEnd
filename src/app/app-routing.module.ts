import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { SearchComponent, ExplorarComponent, HomeComponent, AplicationComponent, LoginComponent, ArticleViewComponent, ConfigComponent, UsersAdminComponent } from "./components/index";
import { AuthGuard, HomeGuard } from "./guards/index";
import { UsersResolverService } from "./services/users-resolver.service";
import { EdicionComponent } from "./components/edicion/edicion.component";
import { ArticleCreatorComponent } from "./components/article-creator/article-creator.component";
import { NewsCreatorComponent } from "./components/news-creator/news-creator.component";
import { NewsComponent } from "./components/news/news.component";
import { NewsViewComponent } from "./components/news-view/news-view.component";
import { FavoritesComponent } from "./components/favorites/favorites.component";


const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent, canActivate: [HomeGuard] },
	{ path: 'login', component: LoginComponent, canActivate: [HomeGuard] },
	{
		path: 'app', component: AplicationComponent, canActivate: [AuthGuard],
		children: [
			{ path: 'search', component: SearchComponent },
			{ path: 'explore', component: ExplorarComponent },
			{ path: 'articles', redirectTo: 'explore' },
			{ path: 'articles/:id', component: ArticleViewComponent },
			{ path: 'newseditor', component: NewsCreatorComponent },
			{ path: 'news', component: NewsComponent },
			{ path: 'news/:id', component: NewsViewComponent },
			{ path: 'admin', component: ConfigComponent },
			{ path: 'users', component: UsersAdminComponent, resolve: { users: UsersResolverService } },
			{ path: 'edicion', component: EdicionComponent },
			{ path: 'articlecreation', component: ArticleCreatorComponent },
			{ path: 'favorites', component: FavoritesComponent }
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
	imports: [RouterModule.forRoot(routes,routerOptions	)],
	exports: [RouterModule]
})
export class AppRoutingModule { }