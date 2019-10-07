import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent, ExplorarComponent, HomeComponent, AplicationComponent, LoginComponent, ArticleViewComponent, ConfigComponent, UsersAdminComponent } from "./components/index";
import { AuthGuard, HomeGuard } from "./guards/index";
import { UsersResolverService } from "./services/users-resolver.service";
import { EdicionComponent } from "./components/edicion/edicion.component";
import { ArticleCreatorComponent } from "./components/article-creator/article-creator.component";
import { NewsCreatorComponent } from "./components/news-creator/news-creator.component";


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
			{ path: 'news', component: NewsCreatorComponent },
			{ path: 'admin', component: ConfigComponent },
			{ path: 'users', component: UsersAdminComponent, resolve: { users: UsersResolverService } },
			{ path: 'edicion', component: EdicionComponent },
			{ path: 'articlecreation', component: ArticleCreatorComponent }
		]
	},
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }