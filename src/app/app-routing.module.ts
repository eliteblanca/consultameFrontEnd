import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from "./search/search.component";
import { ExplorarComponent } from "./explorar/explorar.component";
import { HomeComponent } from "./home/home.component";
import { AplicationComponent } from "./aplication/aplication.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard, HomeGuard } from "./guards/index";
import { ArticleListComponent } from "./article-list/article-list.component";

const routes: Routes = [
	{path: '', redirectTo: '/home', pathMatch:'full'},
	{path: 'home', component: HomeComponent,	canActivate: [HomeGuard]},
	{path: 'login', component: LoginComponent,	canActivate: [HomeGuard]},
	{path: 'app',	component: AplicationComponent,	canActivate: [AuthGuard],
		children:[
			{path: 'search', component: SearchComponent},
			{path: 'explore', component: ExplorarComponent}
		]},
	{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
