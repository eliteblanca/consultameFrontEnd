import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { startWith, map, tap } from 'rxjs/operators';

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

export type sesion = {
    login: number
    logout: number
    userid: string
    id: string
}

export type userNotificationDTO = {
    event:string
    room:string
    data:string
    notificationId:string
    date:string
}

export type usernotification = {
    event:string
    date:number
    room:string
    data:string
    userid:string
    notificationId:string
    id:string
}


@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    constructor(private http: HttpClient) { }

    private currentsesion: sesion

    private endPoints = {
        getUsers: `${environment.endpoint}/api/users`,
        postUser: `${environment.endpoint}/api/users`,
        updateUser: (idUsuario: string) => `${environment.endpoint}/api/users/${idUsuario}`,
        deleteUser: (idUsuario: string) => `${environment.endpoint}/api/users/${idUsuario}`,
        getPcrcUsers: (idPcrc: string) => `${environment.endpoint}/api/pcrc/${idPcrc}/usuarios`,
        postUsersPcrc: (idUsuario: string) => `${environment.endpoint}/api/users/${idUsuario}/pcrc`,
        deleteUserPcrc: (cedula: string, pcrc: string) => `${environment.endpoint}/api/users/${cedula}/pcrc/${pcrc}`,
        searchUsers: `${environment.endpoint}/api/users`,
        postUserSesion: `${environment.endpoint}/api/users/me/sesion`,
        updateUserSesion: (sesionId: string) => `${environment.endpoint}/api/users/me/sesion/${sesionId}`,
        getUserSesions: (userid: string) => `${environment.endpoint}/api/users/${userid}/sesion`,
        postUserNotification: `${environment.endpoint}/api/users/me/notification`,
        getUserNotifications: `${environment.endpoint}/api/users/me/notification`,
        deleteUserNotification: (notificationId:string) => `${environment.endpoint}/api/users/me/notification/${notificationId}`,
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
            map<user[], { state: queryStatus, value?: user[] }>(users => ({ state: "finish", value: users })),
            startWith({ state: "loading" })
        )

    }

    deleteUserPcrc = (cedula: string, idPcrc: string) => {
        return this.http.delete<any>(this.endPoints.deleteUserPcrc(cedula, idPcrc), { observe: "body" })
    }

    searchUsers = (query: string): Observable<{ state: queryStatus, value?: user[] }> => {
        return this.http.get<user[]>(this.endPoints.searchUsers, { params: { query: query }, observe: "body" }).pipe(
            map<user[], { state: queryStatus, value?: user[] }>(users => ({ state: "finish", value: users })),
            startWith({ state: "loading" })
        )
    }

    startUserSesion(login: string, logout: string, pcrc: string): Observable<sesion> {
        return this.http.post<sesion>(this.endPoints.postUserSesion, { login: login, logout: logout, pcrc: pcrc }, { observe: "body" }).pipe(
            tap(result => this.currentsesion = result)
        )
    }

    endUserSesion() {
        if (this.currentsesion) {
            return this.http.put<any>(this.endPoints.updateUserSesion(this.currentsesion.id), { logout: (new Date()).getTime().toString() }, { observe: "body" }).pipe(
                tap(result => this.currentsesion = undefined)
            )
        } else {
            return of(null)
        }
    }


    getUserSesions(userid: string, pcrc: string, from: string, size: string) {
        return this.http.get<user[]>(this.endPoints.getUserSesions(userid), { params: { from: from, size: size, pcrc: pcrc } })
    }

    postUserNotification(data:userNotificationDTO) {
        return this.http.post<usernotification>(this.endPoints.postUserNotification, data, { observe: "body" })
    }

    getUserNotifications(pcrc:string) {
        return this.http.get<usernotification[]>(this.endPoints.getUserNotifications, { params: { pcrc: pcrc } })        
    }

    deleteUserNotification(notificationId:string){
        return this.http.delete<any>(this.endPoints.deleteUserNotification(notificationId))
    }

}