import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';
import { Router } from '@angular/router';
import { mergeMap, tap, filter } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { UserApiService } from "../../api/user-api.service";
import { PcrcApiService, cliente } from "../../api/pcrc-api.service";
import { StateService } from "../../services/state.service";

@Component({
  selector: 'app-side-sheet',
  templateUrl: './side-sheet.component.html',
  styleUrls: ['./side-sheet.component.css']
})
export class SideSheetComponent implements OnInit {

  public clientes: cliente[];
  public clienteSeleccionado: cliente;
  public pcrcSeleccionado: cliente['pcrcs'][0];
  public userName:string;
  public rol:string;
  public userPcrc$:Observable<cliente[]>;

  constructor(
    public userApi: UserApiService,
    public router: Router,
    public userService: UserService,
    private PcrcApiService:PcrcApiService,
    public state:StateService
  ) {  }

  ngOnInit() { 

    this.userName = this.userService.usuario.name
    this.rol = this.userService.usuario.rol

    this.PcrcApiService.getUserPcrc(this.userService.usuario.sub,0,1000).pipe(
          tap(clientes => {

              let selectedClienteId = localStorage.getItem('selectedClienteId')

              let selectedPcrcId = localStorage.getItem('selectedPcrcId')

              this.state.newUserPcrc(clientes)

              if(selectedClienteId != null && selectedPcrcId != null){      

                let cliente = clientes.find(cliente => cliente.id_dp_clientes.toString() == selectedClienteId)

                this.state.newSelectedCliente(cliente)
                
                this.state.newSelectedPcrc(cliente.pcrcs.find(pcrc => pcrc.id_dp_pcrc.toString() == selectedPcrcId))

              } else {

                this.state.newSelectedCliente(clientes[0])

                this.state.newSelectedPcrc(clientes[0].pcrcs[0])
              }
            }
          )
        ).subscribe()
  }

  changeCliente(cliente: cliente) {
    this.state.newSelectedCliente(cliente)
  }

  changeSubLine(pcrc:cliente['pcrcs'][0]) {
    this.state.newSelectedPcrc(pcrc)    
  }

  onPcrcSeleccionado(cliente:cliente){

    localStorage.setItem('selectedClienteId', cliente.id_dp_clientes.toString())
    localStorage.setItem('selectedPcrcId', cliente.pcrcs[0].id_dp_pcrc.toString())

    this.state.newSelectedPcrc(cliente.pcrcs[0])
    this.state.newSelectedCliente(cliente)
  }

  logOut = () => {
    localStorage.removeItem('selectedClienteId')

    localStorage.removeItem('selectedPcrcId')

    this.state.clearState()

    this.userService.logOut()

  }

}
