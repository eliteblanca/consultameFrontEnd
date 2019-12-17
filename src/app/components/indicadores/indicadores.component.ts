import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  public initialDateDrop = false;
  public finalDateDrop = false;

  public dataPrueba = [
    {cliente: 'prueba de cliente'},
    {cliente: 'prueba de cliente'},
    {cliente: 'prueba de cliente'},
    {cliente: 'prueba de cliente'},
    {cliente: 'prueba de cliente'},
    {cliente: 'prueba de cliente'},
    {cliente: 'prueba de cliente'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
