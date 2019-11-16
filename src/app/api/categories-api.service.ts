import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, map, startWith } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export type categoryRaw = {
    pcrcId: string;
    name: string;
    position: number;
    icon: string;
    group: string;
    id: string;
};

export type category = {
    id: string;
    name: string;
    position: number;
    icon: string;
    group: string;
    pcrcId: string;
    subcategories?: category[]
}

type addCategoryDTO = {
    name: string;
    position: number;
    icon: string;
    pcrc: string;
    group?: string
}

type updateCategoryDTO = {
    name: string;
    position: number;
    icon: string;
}

type queryStatus = 'finish'|'loading';

@Injectable({
    providedIn: 'root'
})
export class CategoriesApiService {

    constructor(private http: HttpClient) { }

    private endPoints = {
        getCategories: (idPcrc: string) => `${environment.endpoint}/api/pcrc/${idPcrc}/categories`,
        postCategory: `${environment.endpoint}/api/categories`,
        updateCategory: (idCategory: string) => `${environment.endpoint}/api/categories/${idCategory}`,
        deleteCategory: (idCategory: string) => `${environment.endpoint}/api/categories/${idCategory}`
    };

    getCategories(pcrcId: string):Observable<{ state: queryStatus, value?:category[]}> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<categoryRaw[]>(this.endPoints.getCategories(pcrcId), { observe: "body" })
            }),
            map<categoryRaw[],{ state: queryStatus, value?:category[]}>(categories => {
                let categoriesAux = categories.map(category => { return { subcategories: [], ...category } })

                let categoriesToDelete = [];
                while (categoriesAux.some(category => category.group != undefined)) {
                    for (let i = 0; i < categoriesAux.length; i++) {
                        if (!categoriesAux.some(category => category.group == categoriesAux[i].id)) {
                            let groupIndex = categoriesAux.findIndex(category => category.id == categoriesAux[i].group)
                            categoriesAux[groupIndex].subcategories.push(categoriesAux[i])
                            categoriesToDelete.push(categoriesAux[i].id)
                        }
                    }

                    categoriesAux = categoriesAux.filter(category => !categoriesToDelete.includes(category.id))
                }

                return { state: "finish", value:categoriesAux }
            }),
            startWith({ state: "loading"})
        )
    }

    addCategory(category: addCategoryDTO): Observable<categoryRaw> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.post<categoryRaw>(this.endPoints.postCategory, category, { observe: "body" })
            })
        )
    }

    updateCategory(categoryId: string, category: updateCategoryDTO): Observable<{ status: string }> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.put<{ status: string }>(this.endPoints.updateCategory(categoryId), category, { observe: "body" })
            })
        )
    }

    deleteCategory(categoryId: string): Observable<any> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.delete<any>(this.endPoints.deleteCategory(categoryId), { observe: "body" })
            })
        )
    }
}
