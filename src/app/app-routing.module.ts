import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from "./search/search.component";
import { ExplorarComponent } from "./explorar/explorar.component";

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'explore', component: ExplorarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
