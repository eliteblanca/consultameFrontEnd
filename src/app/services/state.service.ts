import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { CategoriesApiService, category, categoryRaw } from "../api/categories-api.service";
import { news } from "../api/news-api.service";
import { cliente, PcrcApiService } from "../api/pcrc-api.service";
import { user, UserApiService } from "../api/user-api.service";
import { Article } from '../article';
import { UserService } from "../services/user.service";

export type state = {
    selectedPcrc: cliente['pcrcs'][0],
    selectedCliente: cliente,
    userPcrc: cliente[],
    sideSheetOpen: boolean,
    selectedPcrcCategories: { state: 'finish' | 'loading', value?: categoryRaw[] },
    userslist: { state: 'finish' | 'loading', value?: user[] },
    selectedUser: user,
    selectedUserPcrcs: cliente[],
    editionSelectedCategory: categoryRaw,
    selectedUserAccesoTodos: boolean,
    selectedUserPcrcsState: { state: 'finish' | 'loading' },
    buscarEnTodosCheck: boolean,
    usersListQuery: string,
    reportsSelectedDateRange:{from:Date, to:Date},
    idNewsOnEdition: string,
    newDraft: news,
}

@Injectable({
    providedIn: 'root'
})
export class StateService {
    private _state: state = {
        selectedPcrc: {
            cod_pcrc: '',
            id_dp_pcrc: 0,
            pcrc: ''
        },
        selectedCliente: {
            cliente: '',
            id_dp_clientes: 0,
            pcrcs: []
        },
        userPcrc: [],
        sideSheetOpen: false,
        selectedPcrcCategories: { state: 'loading' },
        userslist: { state: 'loading' },
        selectedUser: null,
        selectedUserPcrcs: [],
        editionSelectedCategory: null,
        selectedUserAccesoTodos: false,
        selectedUserPcrcsState: { state: "loading" },
        buscarEnTodosCheck: false,
        usersListQuery: '',
        reportsSelectedDateRange:null,     
        idNewsOnEdition: '',
        newDraft: null
    }

    private store = new BehaviorSubject<state>(this._state)
    private state$ = this.store.asObservable();

    public selectedPcrc$ = this.state$.pipe(map(_state => _state.selectedPcrc), distinctUntilChanged())
    public selectedCliente$ = this.state$.pipe(map(_state => _state.selectedCliente), distinctUntilChanged())
    public userPcrc$ = this.state$.pipe(map(_state => _state.userPcrc), distinctUntilChanged())
    public sideSheetOpen$ = this.state$.pipe(map(_state => _state.sideSheetOpen), distinctUntilChanged())
    public selectedPcrcCategories$ = this.state$.pipe(map(_state => _state.selectedPcrcCategories), distinctUntilChanged())
    public userslist$ = this.state$.pipe(map(_state => _state.userslist), distinctUntilChanged())
    public selectedUser$ = this.state$.pipe(map(_state => _state.selectedUser), distinctUntilChanged(), filter(user => !!user))
    public selectedUserPcrcs$ = this.state$.pipe(map(_state => _state.selectedUserPcrcs), distinctUntilChanged())
    public editionSelectedCategory$ = this.state$.pipe(map(_state => _state.editionSelectedCategory), distinctUntilChanged())
    public selectedUserAccesoTodos$ = this.state$.pipe(map(_state => _state.selectedUserAccesoTodos), distinctUntilChanged())
    public selectedUserPcrcsState$ = this.state$.pipe(map(_state => _state.selectedUserPcrcsState), distinctUntilChanged())
    public buscarEnTodosCheck$ = this.state$.pipe(map(_state => _state.buscarEnTodosCheck), distinctUntilChanged())
    public usersListQuery$ = this.state$.pipe(map(_state => _state.usersListQuery), distinctUntilChanged())
    public reportsSelectedDateRange$ = this.state$.pipe(map(_state => _state.reportsSelectedDateRange), distinctUntilChanged())
    public idNewsOnEdition$ = this.state$.pipe(map(_state => _state.idNewsOnEdition), distinctUntilChanged())
    public newDraft$ = this.state$.pipe(map(_state => _state.newDraft), distinctUntilChanged(), filter(draft => !!draft))

    constructor(
        public route: ActivatedRoute,
        public categoriesApi: CategoriesApiService,
        public UserService: UserService,
        public userApi: UserApiService,
        private pcrcApi: PcrcApiService,
    ) {
        this.selectedPcrc$.pipe(
            switchMap(pcrc => this.categoriesApi.getCategories(pcrc.id_dp_pcrc.toString())),
            tap(selectedPcrcCategories => {
                this.store.next(this._state = { ...this._state, selectedPcrcCategories: selectedPcrcCategories })
            })
        ).subscribe()

        this.selectedPcrc$.pipe(
            filter(pcrc => this.UserService.usuario.rol == 'admin'),
            switchMap(pcrc => this.userApi.getPcrcUsers(pcrc.id_dp_pcrc.toString())),
            tap(users => {
                this.store.next(this._state = { ...this._state, userslist: users })
            })
        ).subscribe()

        this.selectedUser$.pipe(
            tap(user => { this.newSelectedUserPcrcState({ state: "loading" }) }),
            switchMap(user => this.pcrcApi.getUserPcrc(user.cedula, 0, 1000)),
            tap(pcrcs => {
                this.store.next(this._state = { ...this._state, selectedUserPcrcs: pcrcs })
                this.newSelectedUserPcrcState({ state: "finish" })
            })
        ).subscribe()
    }

    newSelectedPcrc(selectedPcrc: cliente['pcrcs'][0]) {
        this.store.next(this._state = { ...this._state, selectedPcrc: selectedPcrc })
    }

    newSelectedCliente(selectedCliente: cliente) {
        this.store.next(this._state = { ...this._state, selectedCliente: selectedCliente })
        this.store.next(this._state = { ...this._state, selectedPcrc: selectedCliente.pcrcs[0] })
    }

    newUserPcrc(userPcrc: cliente[]) {
        this.store.next(this._state = { ...this._state, userPcrc: userPcrc })
    }

    toogleSideSheet() {
        this.store.next(this._state = { ...this._state, sideSheetOpen: !this._state.sideSheetOpen })
    }

    addCategory(category: category) {
        this.store.next(this._state = {
            ...this._state,
            selectedPcrcCategories: {
                state: this._state.selectedPcrcCategories.state,
                value: [category, ...this._state.selectedPcrcCategories.value]
            }
        })
    }

    selectUser(user: user) {
        this.store.next(this._state = { ...this._state, ...{ selectedUser: user } })
    }

    newEditionSelectedCategory(category: categoryRaw) {
        this.store.next(this._state = { ...this._state, editionSelectedCategory: category })
    }

    getSelectedUser = () => this._state.selectedUser

    newDeletedCategory = (categoryId: string) => {
        this.store.next(this._state = { ...this._state, selectedPcrcCategories: { value: this._state.selectedPcrcCategories.value.filter(category => category.id != categoryId), state: "finish" } })
    }

    getValueOf = <K extends keyof state>(key: K) => {
        return this._state[key]
    }

    newSelectedUserPcrc = (pcrcs: cliente[]) => {
        this.store.next(this._state = { ...this._state, selectedUserPcrcs: pcrcs })
    }

    newSelectedUserPcrcState = (state: state['selectedUserPcrcsState']) => {
        this.store.next(this._state = { ...this._state, selectedUserPcrcsState: state })
    }

    clearState = () => {
        this.store.next(this._state = {
            selectedPcrc: {
                cod_pcrc: '',
                id_dp_pcrc: 0,
                pcrc: ''
            },
            selectedCliente: {
                cliente: '',
                id_dp_clientes: 0,
                pcrcs: []
            },
            userPcrc: [],
            sideSheetOpen: false,
            selectedPcrcCategories: { state: 'loading' },
            userslist: { state: 'loading' },
            selectedUser: null,
            selectedUserPcrcs: [],
            editionSelectedCategory: null,
            selectedUserAccesoTodos: false,
            selectedUserPcrcsState: { state: "loading" },
            buscarEnTodosCheck: false,
            usersListQuery: '',
            reportsSelectedDateRange:null,
            idNewsOnEdition: '',
            newDraft:null
        })
    }

    buscarEnTodosCheckChange = (state: boolean) => {
        this.store.next(this._state = { ...this._state, buscarEnTodosCheck: state })
    }

    newUsersListQuery = (query: string) => {

        this.store.next(this._state = { ...this._state, usersListQuery: query })
        if (!!query && !this._state.buscarEnTodosCheck) {
            
            this.store.next(this._state = { ...this._state, userslist: { state: "loading" } })

            this.userApi.getPcrcUsers(this._state.selectedPcrc.id_dp_pcrc.toString()).pipe(
                tap(users => {
                    if(users.value){
                        let filteredUsers = users.value.filter(user => user.cedula.includes(query) || user.nombre.toLowerCase().replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u').includes(query.toLowerCase()))
                        this.store.next(this._state = { ...this._state, userslist: { state: "finish", value: filteredUsers } })
                    }
                })
            ).subscribe()

        } else if (!!query && this._state.buscarEnTodosCheck) {
            this.userApi.searchUsers(query).pipe(
                tap(users => {
                    this.store.next(this._state = { ...this._state, userslist: users })
                })
            ).subscribe()

        } else {
            this.userApi.getPcrcUsers(this._state.selectedPcrc.id_dp_pcrc.toString()).pipe(
                tap(users => {
                    this.store.next(this._state = { ...this._state, userslist: users })
                })
            ).subscribe()

        }
    }
    
    newReportsSelectedDateRange = (rango:{from:Date, to:Date}) =>{
        this.store.next(this._state = { ...this._state, reportsSelectedDateRange: rango })
    }

    onIdNewsOnEdition = (idNewsOnEdition:string) => {
        this.store.next(this._state = { ...this._state, idNewsOnEdition: idNewsOnEdition })
    }
    
    onNewDraft = (draft:news) => {
        this.store.next(this._state = { ...this._state, newDraft: draft })
    }
}