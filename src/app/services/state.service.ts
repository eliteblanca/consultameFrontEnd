import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, iif } from 'rxjs';
import { map, distinctUntilChanged, tap, filter, switchMap } from 'rxjs/operators';
import { PcrcApiService, cliente } from "../api/pcrc-api.service";
import { category, CategoriesApiService, categoryRaw } from "../api/categories-api.service";
import { ActivatedRoute } from '@angular/router';
import { user } from "../api/user-api.service";
import { UserService } from "../services/user.service";
import { UserApiService } from "../api/user-api.service";
import { Article } from '../article';

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
    reportsSelectedCliente: cliente,
    reportsSelectedPcrc: cliente['pcrcs'][0],
    reportsSelectedCategory: categoryRaw,
    reportsSelectedDateRange:{from:Date, to:Date},
    reportsSelectedPcrcCategories:{
        state: "finish" | "loading";
        value?: categoryRaw[];
    },
    reportsSelectedArticle: Article

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
        reportsSelectedCliente:null,
        reportsSelectedPcrc:null,
        reportsSelectedCategory:null,
        reportsSelectedDateRange:null,
        reportsSelectedPcrcCategories:{ state: 'loading' },        
        reportsSelectedArticle: null

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
    public reportsSelectedCliente$ = this.state$.pipe(map(_state => _state.reportsSelectedCliente), distinctUntilChanged())
    public reportsSelectedPcrc$ = this.state$.pipe(map(_state => _state.reportsSelectedPcrc), distinctUntilChanged())
    public reportsSelectedCategory$ = this.state$.pipe(map(_state => _state.reportsSelectedCategory), distinctUntilChanged())
    public reportsSelectedDateRange$ = this.state$.pipe(map(_state => _state.reportsSelectedDateRange), distinctUntilChanged())
    public repostsSelectedPcrcCategories$ = this.state$.pipe(map(_state => _state.reportsSelectedPcrcCategories), distinctUntilChanged())
    public repostsSelectedArticle$ = this.state$.pipe(map(_state => _state.reportsSelectedArticle), distinctUntilChanged())

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

        this.reportsSelectedCliente$.pipe(
            tap(cliente => {
                this.newReportsSelectedPcrc(null)
                this.store.next(this._state = { ...this._state,  reportsSelectedPcrcCategories: { state:"loading" }  })
            })
        ).subscribe()

        this.reportsSelectedPcrc$.pipe(
            tap(pcrc => {
                this.newReportsSelectedCategory(null)  
            }),
            filter(pcrc => !!pcrc),
            switchMap(pcrc => this.categoriesApi.getCategories(pcrc.id_dp_pcrc.toString())),
            tap(categories => {
                this.store.next(this._state = { ...this._state,  reportsSelectedPcrcCategories: categories  })
            })
        ).subscribe()

        this.reportsSelectedCategory$.pipe(
            tap(category => this.newReportsSelectedArticle(null))
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
            reportsSelectedCliente:null,
            reportsSelectedPcrc:null,
            reportsSelectedCategory:null,
            reportsSelectedDateRange:null,
            reportsSelectedPcrcCategories:{ state: 'loading' },
            reportsSelectedArticle: null
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

    newReportsSelectedCliente = (selectedCliente:cliente) =>{
        this.store.next(this._state = { ...this._state, reportsSelectedCliente: selectedCliente })
    }

    newReportsSelectedPcrc = (selectedPcrc:cliente['pcrcs'][0]) =>{
        this.store.next(this._state = { ...this._state, reportsSelectedPcrc: selectedPcrc })
    }

    newReportsSelectedCategory = (selectedCategory:categoryRaw) =>{
        this.store.next(this._state = { ...this._state, reportsSelectedCategory: selectedCategory })
    }
    
    newReportsSelectedDateRange = (rango:{from:Date, to:Date}) =>{
        this.store.next(this._state = { ...this._state, reportsSelectedDateRange: rango })
    }

    newReportsSelectedArticle = (article:Article) =>{
        this.store.next(this._state = { ...this._state, reportsSelectedArticle: article })
    }

}