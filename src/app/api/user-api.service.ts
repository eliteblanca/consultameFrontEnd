import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { startWith, map } from 'rxjs/operators';

export interface user {
    id: string;
    cedula: string;
    nombre: string;
    rol: 'admin' | 'user' | 'publicador';
    pcrc: string[];
}

type queryStatus = 'finish' | 'loading';

export type AllowedLines = {
    name: string;
    id: string;
    sublines: {
        id: string;
        name: string;
        line: string;
    }[]
}[];

@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    constructor(private http: HttpClient) { }

    private endPoints = {
        getUsers: `${environment.endpoint}/api/users`,
        postUser: `${environment.endpoint}/api/users`,
        updateUser: (idUsuario: string) => `${environment.endpoint}/api/users/${idUsuario}`,
        deleteUser: (idUsuario: string) => `${environment.endpoint}/api/users/${idUsuario}`,
        getPcrcUsers: (idPcrc: string) => `${environment.endpoint}/api/pcrc/${idPcrc}/usuarios`,
        postUsersPcrc: (idUsuario: string) => `${environment.endpoint}/api/users/${idUsuario}/pcrc`,
        deleteUserPcrc: (cedula:string, pcrc:string) => `${environment.endpoint}/api/users/${cedula}/pcrc/${pcrc}`,
    }    

    postUserPcrc(idUsuario: string, idPcrc: string): Observable<{ status: string }> {
        return this.http.post<{ status: string }>(this.endPoints.postUsersPcrc(idUsuario), { pcrc: idPcrc }, { observe: "body" })
    }

    getUsers(): Observable<user[]> {
        return this.http.get<user[]>(this.endPoints.getUsers, { observe: "body" })
    }

    deleteUser(idUser: string): Observable<{ deleted: number }> {
        return this.http.delete<{ deleted: number }>(this.endPoints.deleteUser(idUser), { observe: "body" })
    }

    postUser(user: { username: string, password: string, rol: string }): Observable<user> {
        return this.http.post<user>(this.endPoints.postUser, user, { observe: "body" })
    }

    updateUserRol(idUsuario: string, newRol: string): Observable<{ status: string }> {
        return this.http.put<{ status: string }>(this.endPoints.updateUser(idUsuario), { rol: newRol }, { observe: "body" })
    }

    getPcrcUsers(idPcrc: string): Observable<{ state: queryStatus, value?: user[] }> {

        return this.http.get<user[]>(this.endPoints.getPcrcUsers(idPcrc), { observe: "body" }).pipe(
            map<user[],{ state: queryStatus, value?: user[]}  >(users => ({ state: "finish", value: users })),
            startWith({ state: "loading" })
        )

    }

    deleteUserPcrc = (cedula:string, idPcrc:string) => {
        return this.http.delete<any>(this.endPoints.deleteUserPcrc(cedula, idPcrc),{ observe: "body" })
    }

}