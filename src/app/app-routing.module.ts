import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent, ExplorarComponent, HomeComponent, AplicationComponent, LoginComponent, ArticleViewComponent, NewsComponent, EdicionComponent } from "./components/index";
import { AuthGuard, HomeGuard, LineGuard } from "./guards/index";

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
			{path: 'edit', component: EdicionComponent}
		]},
	{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }