import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export type categoryRaw = {
    sublinea: string;
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
    subcategories?: category[]
}

type addCategoryDTO = {
    name: string;
    position: number;
    icon: string;
    sublinea: string;
    group?: string
}

type updateCategoryDTO = {
    name: string;
    position: number;
    icon: string;
}

@Injectable({
    providedIn: 'root'
})
export class CategoriesApiService {

    constructor(private http: HttpClient) { }

    private endPoints = {
        getCategories: (id: string) => `${environment.endpoint}/api/sublines/:idSubline/categories`.replace(':idSubline', id),
        postCategory: `${environment.endpoint}/api/categories`,
        updateCategory: (id: string) => `${environment.endpoint}/api/categories/:idCategory`.replace(':idCategory', id),
        deleteCategory: (id: string) => `${environment.endpoint}/api/categories/:idCategory`.replace(':idCategory', id)
    };

    getCategories(sublineId: string): Observable<category[]> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<categoryRaw[]>(this.endPoints.getCategories(sublineId), { observe: "body" })
            }),
            map(categories => {
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

                return categoriesAux;
            })
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
