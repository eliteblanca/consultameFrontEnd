import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export type categories = {
    sublinea: string;
    name: string;
    position: number;
    icon: string;
    group: string;
    id: string;
}[];

@Injectable({
    providedIn: 'root'
})
export class CategoriesApiService {

    constructor(private http: HttpClient) { }

    private host = "http://localhost:3001";
    private endPoint = `${this.host}/api/sublines/:idSubline/categories`;

    getCategories(sublineId: string): Observable<categories> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<categories>(this.endPoint.replace(':idSubline', sublineId), { observe: "body" })
            })
        )
    }
}
