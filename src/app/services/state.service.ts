import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, tap, filter, switchMap } from 'rxjs/operators';
import { cliente } from "../api/pcrc-api.service";
import { category, CategoriesApiService } from "../api/categories-api.service";
import { ActivatedRoute } from '@angular/router';
import { user } from "../api/user-api.service";
import { UserService } from "../services/user.service";
import { UserApiService } from "../api/user-api.service";

type state = {
    selectedPcrc:cliente['pcrcs'][0],
    selectedCliente:cliente,
    userPcrc:cliente[],
    sideSheetOpen:boolean,
    selectedPcrcCategories:{ state: 'finish'|'loading', value?:category[]},
    userslist:{ state: 'finish'|'loading', value?:user[]}
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
        userPcrc:[],
        sideSheetOpen:false,
        selectedPcrcCategories:{ state: 'loading'},
        userslist:{ state: 'loading'}
        
    }

    private store = new BehaviorSubject<state>(this._state)
    private state$ = this.store.asObservable();

    public selectedPcrc$ = this.state$.pipe(map(_state => _state.selectedPcrc), distinctUntilChanged())
    public selectedCliente$ = this.state$.pipe(map(_state => _state.selectedCliente), distinctUntilChanged())
    public userPcrc$ = this.state$.pipe(map(_state => _state.userPcrc), distinctUntilChanged())
    public sideSheetOpen$ = this.state$.pipe(map(_state => _state.sideSheetOpen), distinctUntilChanged())
    public selectedPcrcCategories$ = this.state$.pipe(map(_state => _state.selectedPcrcCategories), distinctUntilChanged())
    public userslist$ = this.state$.pipe(map(_state => _state.userslist), distinctUntilChanged())

    constructor(
        public route: ActivatedRoute,
        public categoriesApi: CategoriesApiService,
        public UserService: UserService,
        public userApi: UserApiService,
    ){
        this.selectedPcrc$.pipe(
            switchMap( pcrc => this.categoriesApi.getCategories(pcrc.id_dp_pcrc.toString()) ),
            tap(selectedPcrcCategories => {
                this.store.next(this._state = {...this._state, selectedPcrcCategories:selectedPcrcCategories })
            })
            ).subscribe()
            
        this.selectedPcrc$.pipe(
            filter(pcrc => this.UserService.usuario.rol == 'admin'),
            switchMap(pcrc => this.userApi.getPcrcUsers(pcrc.id_dp_pcrc.toString())),
            tap(users => {
                this.store.next(this._state = {...this._state, userslist:users })
            })
        ).subscribe()

    }

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

    toogleSideSheet(){
        this.store.next(this._state = {...this._state, sideSheetOpen: !this._state.sideSheetOpen })
    }

    addCategory(category:category){
        this.store.next(this._state = {
            ...this._state,
            selectedPcrcCategories:{
                 state:this._state.selectedPcrcCategories.state,
                 value: [category, ...this._state.selectedPcrcCategories.value]
            } 
        })
    }

}