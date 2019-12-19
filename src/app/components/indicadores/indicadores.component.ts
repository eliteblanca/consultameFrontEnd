import { Component, OnInit } from '@angular/core';
import { StateService } from "../../services/state.service";
@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  public initialDateDrop = false;
  public finalDateDrop = false;
  public categoryDrop = false;
  public articlesDrop = false;

  public dataPrueba = [
    {cliente: 'prueba de cliente'},
    {cliente: 'prueba de cliente'},
    {cliente: 'prueba de cliente'},
    {cliente: 'prueba de cliente'},
    {cliente: 'prueba de cliente'},
    {cliente: 'prueba de cliente'},
    {cliente: 'prueba de cliente'}
  ]

  constructor(public state:StateService) {  }

  ngOnInit() {  }

  clienteSelected(event:any){
    this.state.newReportsSelectedCliente(event)
  }

  pcrcSelected(event:any){
    this.state.newReportsSelectedPcrc(event)
  }

  categorySelected(event){
    this.state.newReportsSelectedCategory(event)
  }

  articleSelected(event){
    this.state.newReportsSelectedArticle(event)
  }

}