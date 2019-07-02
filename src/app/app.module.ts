//#region imports 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ExplorarComponent } from './explorar/explorar.component';
import { HeaderComponent } from './header/header.component';
import { SearchBoxComponent } from './search-box/search-box.component';

import { ApiService } from "./api.service";
import { mockServerService } from "./mock-back-end.service";  
////#endregion imports
@NgModule({
  declarations: [
    AppComponent,
    ExplorarComponent,
    HeaderComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService,mockServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
