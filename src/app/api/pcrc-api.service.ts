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

export type search = {
    subline: string;
    query: string;
    searches: number;
    id: string;
}

@Injectable({
    providedIn: 'root'
})
export class PcrcApiService {

    constructor(private http: HttpClient) { }

    private endPoints = {
        getAllPcrc: `${environment.endpoint}/api/pcrc`,
        getUserPcrc: (cedula: string) => `${environment.endpoint}/api/users/${cedula}/pcrc`,
        postUserPcrc: (cedula: string) => `${environment.endpoint}/api/users/${cedula}/pcrc`,
        getSuggestions: (idPcrc: string) => `${environment.endpoint}/api/pcrc/${idPcrc}/suggestions`,
    }

    getUserPcrc = (cedula: string, from: number = 0, size: number = 10) => {
        return this.http.get<cliente[]>(this.endPoints.getUserPcrc(cedula), { params: { from: from.toString(), size: size.toString() }, observe: "body" })
    }

    getAllPcrc = () => {
        return this.http.get<cliente[]>(this.endPoints.getAllPcrc, { observe: "body" })
    }

    getSuggestions = (idPcrc: string, input: string) => {
        return this.http.get<search[]>(this.endPoints.getSuggestions(idPcrc), { params: { input: input }, observe: "body" })
    }

    

}