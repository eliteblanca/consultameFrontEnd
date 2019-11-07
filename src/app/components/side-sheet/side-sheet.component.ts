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

    this.PcrcApiService.getUserPcrc(this.userService.usuario.sub).pipe(
          tap(clientes => {
              this.state.newUserPcrc(clientes)
              this.state.newSelectedCliente(clientes[0])
              this.state.newSelectedPcrc(clientes[0].pcrcs[0])
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
}
