import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent, ExplorarComponent, HomeComponent, AplicationComponent, LoginComponent, ArticleViewComponent, NewsComponent, ConfigComponent, UsersAdminComponent } from "./components/index";
import { AuthGuard, HomeGuard } from "./guards/index";
import { UsersResolverService } from "./services/users-resolver.service";


const routes: Routes = [
	{path: '', redirectTo: '/home', pathMatch:'full'},
	{path: 'home', component: HomeComponent,	canActivate: [HomeGuard]},
	{path: 'login', component: LoginComponent,	canActivate: [HomeGuard]},
	{path: 'app',	component: AplicationComponent,	canActivate: [AuthGuard],
		children:[
			{path: 'search', component: SearchComponent},
			{path: 'explore', component: ExplorarComponent},
			{path: 'articles', redirectTo: 'explore'},
			{path: 'articles/:id', component: ArticleViewComponent},
			{path: 'news', component: NewsComponent},
			{path: 'admin', component: ConfigComponent},
			{path: 'users', component: UsersAdminComponent, resolve: { users:UsersResolverService }}
		]},
	{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }