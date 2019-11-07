import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AllowedLines } from "../api/user-api.service";
import { map, distinctUntilChanged } from 'rxjs/operators';
import { cliente } from "../api/pcrc-api.service";

type state = {
    selectedPcrc:cliente['pcrcs'][0],
    selectedCliente:cliente,
    userPcrc:cliente[]
}

@Injectable({
    providedIn: 'root'
})
export class StateService {
    private _state:state = {
        selectedPcrc:{
            cod_pcrc:'',
            id_dp_pcrc:0,
            pcrc:''
        },
        selectedCliente:{
            cliente:'',
            id_dp_clientes:0,
            pcrcs:[]
        },
        userPcrc:[]
    }

    private store = new BehaviorSubject<state>(this._state)
    private state$ = this.store.asObservable();

    public selectedPcrc$ = this.state$.pipe(map(_state => _state.selectedPcrc), distinctUntilChanged())
    public selectedCliente$ = this.state$.pipe(map(_state => _state.selectedCliente), distinctUntilChanged())
    public userPcrc$ = this.state$.pipe(map(_state => _state.userPcrc), distinctUntilChanged())

    newSelectedPcrc(selectedPcrc:cliente['pcrcs'][0]){
        this.store.next(this._state = {...this._state, selectedPcrc:selectedPcrc })
    }

    newSelectedCliente(selectedCliente:cliente){
        this.store.next(this._state = {...this._state, selectedCliente: selectedCliente })
        this.store.next(this._state = {...this._state, selectedPcrc: selectedCliente.pcrcs[0] })
    }

    newUserPcrc(userPcrc:cliente[]){
        this.store.next(this._state = {...this._state, userPcrc: userPcrc })
    }

}