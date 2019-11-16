import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export type cliente = {
    id_dp_clientes: number;
    cliente: string;
    pcrcs: {
            id_dp_pcrc: number;
            pcrc: string;
            cod_pcrc: string;
        }[]
}

@Injectable({
    providedIn: 'root'
})
export class PcrcApiService {

    constructor(private http: HttpClient) { }
    
    private endPoints = {
        getAllPcrc:`${environment.endpoint}/api/pcrc`,
        getUserPcrc: (cedula:string) => `${environment.endpoint}/api/users/${cedula}/pcrc`,
        postUserPcrc: (cedula:string) => `${environment.endpoint}/api/users/${cedula}/pcrc`,
        deleteUserPcrc: (cedula:string, pcrc:string) => `${environment.endpoint}/api/users/${cedula}/pcrc/${pcrc}`,
    }

    getUserPcrc = (cedula:string, from:number = 0, size:number = 10) => {
        return this.http.get<cliente[]>(this.endPoints.getUserPcrc(cedula), { params: { from: from.toString(), size: size.toString() }, observe: "body" })
    }

    
}