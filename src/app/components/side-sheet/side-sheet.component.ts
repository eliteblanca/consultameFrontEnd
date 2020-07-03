import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { cliente, PcrcApiService } from "../../api/pcrc-api.service";
import { UserApiService } from "../../api/user-api.service";
import { StateService } from "../../services/state.service";
import { googleAnalytics } from "../../services/googleAnalytics.service";
import { AutenticateApiService } from "../../api/autenticate-api.service";
@Component({
  selector: 'app-side-sheet',
  templateUrl: './side-sheet.component.html',
  styleUrls: ['./side-sheet.component.css']
})
export class SideSheetComponent implements OnInit {

  public clientes: cliente[];
  public clienteSeleccionado: cliente;
  public pcrcSeleccionado: cliente['pcrcs'][0];
  public userName: string;
  public rol: string;
  public userPcrc$: Observable<cliente[]>;
  public changePcrc: boolean;
  public logoutLoading = false;


  constructor(
    public userApi: UserApiService,
    public router: Router,
    private PcrcApiService: PcrcApiService,
    public state: StateService,
    public googleAnalytics: googleAnalytics,
    public autenticateApi: AutenticateApiService,
  ) { }

  ngOnInit() {
    this.userName = this.state.getValueOf('user').name
    this.rol = this.state.getValueOf('user').rol   
  }

  changeCliente(cliente: cliente) {
    this.googleAnalytics.setDimension(1, 'cliente', cliente.cliente)
    this.state.newSelectedCliente(cliente)
  }

  changeSubLine(pcrc: cliente['pcrcs'][0]) {
    this.googleAnalytics.setDimension(2, 'pcrc', pcrc.pcrc)
    this.state.newSelectedPcrc(pcrc)
  }

  onPcrcSeleccionado(cliente: cliente) {

    localStorage.setItem('selectedClienteId', cliente.id_dp_clientes.toString())
    localStorage.setItem('selectedPcrcId', cliente.pcrcs[0].id_dp_pcrc.toString())

    this.state.newSelectedPcrc(cliente.pcrcs[0])
    this.state.newSelectedCliente(cliente)
  }

  logOut = () => {
    localStorage.removeItem('selectedClienteId')
    localStorage.removeItem('selectedPcrcId')
    this.logoutLoading = true;
    this.autenticateApi.logOut()
  }

}