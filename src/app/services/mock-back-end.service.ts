import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LocalStorage } from "../local-storage";

const host = "http://localhost:3000";

type categories = {
    name: string,
    order: number,
    desplegado: boolean,
    subcategories?: categories
}[];

@Injectable({
    providedIn: 'root'
})
class MockBackEndService implements HttpInterceptor {

    BBDD: LocalStorage;

    enrutar(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req);
    }

    intercept(req: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.enrutar(req, next);
    };

    constructor() {
        this.BBDD = new LocalStorage();
    }
}

export const mockServerService = { provide: HTTP_INTERCEPTORS, useClass: MockBackEndService, multi: true }