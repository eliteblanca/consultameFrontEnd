import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
interface line {
    name: string;
}

interface subline {
    name: string;
    line: string;
}

export type AllowedLines = {
    name: string;
    id: string;
    sublines: {
        id: string;
        name: string;
        line: string;
    }[]
}[];

export interface user {
    username:string;
    rol:string;
    id:string;
}

@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    constructor(private http: HttpClient) { }

    private host = "http://localhost:3001";
    private endPoints = {
        getUserAllowedlines:(id:string) => `${this.host}/api/users/:idUsuario/allowedlines`.replace(':idUsuario', id ),
        getUsers: `${this.host}/api/users`,
        postUser: `${this.host}/api/users`,
        updateUser: (id:string) => `${this.host}/api/users/:idUsuario`.replace(':idUsuario', id ),
        postUserAllowedline:(id:string) => `${this.host}/api/users/:idUsuario/allowedlines`.replace(':idUsuario', id ),
        deleteUserAllowedline:(idUsuario:string, idSublinea:string) => `${this.host}/api/users/:idUsuario/allowedlines/:idSubline`.replace(':idUsuario', idUsuario ).replace(':idSubline', idSublinea ),
        deleteUser:(id:string) => `${this.host}/api/users/:idUsuario`.replace(':idUsuario', id )
    } 

    getUserAllowedlines(idUsuario:string): Observable<AllowedLines> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<AllowedLines>(this.endPoints.getUserAllowedlines(idUsuario), { observe: "body" })
            })
        )
    }

    postUserAllowedLines(idUsuario:string, idSubline:string):Observable<{status:string}>{
        return this.http.post<{status:string}>(this.endPoints.postUserAllowedline(idUsuario),{ subline:idSubline },{ observe: "body" })
    }

    deleteUserAllowedLine(idUsuario:string, idSubline:string):Observable<{ deleted: number }>{
        return this.http.delete<{ deleted: number }>(this.endPoints.deleteUserAllowedline(idUsuario, idSubline), { observe: "body" })
    }

    getUsers():Observable<user[]>{
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<user[]>(this.endPoints.getUsers, { observe: "body" })
            })
        )
    }

    deleteUser(idUser:string):Observable<{ deleted: number }>{
        return this.http.delete<{ deleted: number }>(this.endPoints.deleteUser(idUser), { observe: "body" })
    }

    postUser(user:{ username:string, password:string, rol:string }):Observable<user>{
        return this.http.post<user>(this.endPoints.postUser,user,{ observe: "body" })
    }

    updateUserRol(idUsuario:string, newRol:string):Observable<{ status: string }>{
        return this.http.put<{ status: string }>(this.endPoints.updateUser(idUsuario),{ rol:newRol },{ observe: "body" })
    }

}