import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CategoriesApiService, categoryRaw } from "../../api/categories-api.service";
import { JarvisApiService, personData } from "../../api/jarvis-api.service";
import { cliente, PcrcApiService } from "../../api/pcrc-api.service";
import { StateService } from "../../services/state.service";
import { Article } from '../../article';
import { ReportsApiService } from "../../api/reports-api.service";
import { posibleFilterFields, commentsReport } from "../../api/reports-api.service";
import format from 'date-fns/format';

@Component({
  selector: 'app-reporte-comentarios',
  templateUrl: './reporte-comentarios.component.html',
  styleUrls: ['./reporte-comentarios.component.css']
})
export class ReporteComentariosComponent implements OnInit {


  public initialDateDrop = false
  public finalDateDrop = false
  
  public categoryDrop = false
  public articlesDrop = false

  public isDirectorActive = false
  public isGerenteActive = false
  public isCoordinadorActive = false
  public isLiderActive = false
  public isPcrcActive = false
  public isCategoriaActive = false
  public isArticleActive = false  

  clientesList: cliente[]
  pcrcList: cliente['pcrcs'][0][]
  categoriesList: {
    state: "finish" | "loading";
    value?: categoryRaw[];
  }

  directores: personData[]
  gerentesList: personData[]
  coordisList: personData[]
  lideresList: personData[]

  selectedCliente: cliente
  selectedPcrc: cliente['pcrcs'][0]
  selectedCategory: categoryRaw
  selectedArticle: Article

  selectedDirector: personData
  selectedGerente: personData
  selectedCoordi: personData
  selectedLider: personData

  initialDate:Date
  finalDate:Date
  initialDateHumanRead = ''
  finalDateHumanRead = ''

  data:object[] = []
  currentPage = 1;
  pageSize = 12;
  totalItems:number = 0;

  tableIsLoading = false;

  selectedData: commentsReport['items'][0];

  constructor(
    public state: StateService,
    public pcrcApi: PcrcApiService,
    public jarvisApi: JarvisApiService,
    public categoriesApi: CategoriesApiService,
    public reportsApi: ReportsApiService,
  ) { }

  ngOnInit() {

    this.pcrcApi.getUserPcrc(this.state.getValueOf('user').sub, 0, 1000).pipe(
      tap(pcrcs => {
        this.clientesList = [ { cliente:'Cualquiera', id_dp_clientes:0, pcrcs:[] } ,...pcrcs]
      })
    ).subscribe()

    this.jarvisApi.getClientDirectores('all').pipe(
      tap(directores => {
        this.directores = [{ cedula: '0', nombre: 'Cualquiera' }, ...directores]
      })
    ).subscribe()

  }

  clienteSelected(selectedClient: cliente) {

    this.selectedCliente = selectedClient

    this.isPcrcActive = true

    this.pcrcList = [ { cod_pcrc:'0', id_dp_pcrc:0, pcrc:'Cualquiera' } , ...selectedClient.pcrcs ]

    this.categoriesList = null

    this.selectedCategory = null

    this.selectedPcrc = null

  }

  pcrcSelected(event: cliente['pcrcs'][0]) {

    this.selectedPcrc = event

    this.selectedCategory = null

    this.categoriesApi.getCategories(this.selectedPcrc.id_dp_pcrc.toString()).pipe(
      tap(categories => {
        if(categories.state == 'finish'){
          this.categoriesList = { state:'finish', value:[ {
            icon:'',
            id:'',
            name:'Cualquiera',
            pcrcId:'',
            position:0
          }, ...categories.value] }

        } else {
          this.categoriesList = categories

        }

        this.isCategoriaActive = true;
      })
    ).subscribe()

  }

  categorySelected(event: categoryRaw) {

    this.selectedCategory = event

    this.isArticleActive = true

  }

  articleSelected(event: Article) {
    this.articlesDrop = false
    this.selectedArticle = event
  }

  onInitialDateChange(event: { value: Date }) {
    this.initialDate = event.value
    this.initialDate.setHours(0)
    this.initialDate.setMinutes(0)
    this.initialDateHumanRead = format(this.initialDate, "dd/MM/y")
  }

  onFinalDateChange(event: { value: Date }) {
    this.finalDate = event.value
    this.finalDate.setHours(23)
    this.finalDate.setMinutes(59)
    this.finalDateHumanRead = format(this.finalDate, "dd/MM/y")
  }  

  onDirectorSelected(directorSelected: personData) {

    console.log(directorSelected)

    this.selectedDirector = directorSelected;

    this.jarvisApi.getDirectorGerentes(directorSelected.cedula).pipe(
      tap(gerentes => {
        this.gerentesList = [{ cedula: '0', nombre: 'Cualquiera' }, ...gerentes]
        this.isGerenteActive = true;
      })
    ).subscribe()

  }

  onGerenteSelected(gerenteSelected: personData) {
    this.selectedGerente = gerenteSelected

    this.jarvisApi.getGerenteCoordis(gerenteSelected.cedula).pipe(
      tap(coordis => {
        this.coordisList = [{ cedula: '0', nombre: 'Cualquiera' }, ...coordis];
        this.isCoordinadorActive = true;
      })
    ).subscribe()
  }

  onCoordiSelected(coordiSelected: personData) {
    this.selectedCoordi = coordiSelected

    this.jarvisApi.getCoordiLideres(coordiSelected.cedula).pipe(
      tap(lideres => {
        this.isLiderActive = true
        this.lideresList = [{ cedula: '0', nombre: 'Cualquiera' }, ...lideres]
      })
    ).subscribe()
  }

  onLiderSelected(selectedLider: personData) {
    this.selectedLider = selectedLider
  }

  search() {

    if(!!!this.initialDate && !!!this.finalDate){
      this.initialDate = new Date(949678013133)
      this.finalDate = (new Date())
    }

    this.reportsApi.getComents(this.initialDate.getTime(), this.finalDate.getTime(), this.getFilters(), (this.currentPage-1)*this.pageSize, this.pageSize).pipe(
      tap(result => {
        this.data = result.items.map(item => {
          return {
            ...item,
            publicationDate: format(item.publicationDate, 'd/M/y H:m:s')
          }
        })
        
        this.totalItems = result.totalItems
      })      
    ).subscribe()
  }

  getFilters() {

    let filter1: { filter: posibleFilterFields, value: string }

    let filter2: { filter: posibleFilterFields, value: string }

    if (!!this.selectedCliente && this.selectedCliente.cliente != 'Cualquiera') {
      filter1 = { value: this.selectedCliente.id_dp_clientes.toString(), filter: 'cliente' }
      if (!!this.selectedPcrc && this.selectedPcrc.pcrc != 'Cualquiera') {
        filter1 = { value: this.selectedPcrc.id_dp_pcrc.toString(), filter: 'pcrc' }
        if (!!this.selectedCategory && this.selectedCategory.name != 'Cualquiera') {
          filter1 = { value: this.selectedCategory.id, filter: 'categoria' }
          if (!!this.selectedArticle && this.selectedArticle.title != 'Cualquiera') {
            filter1 = { value: this.selectedArticle.id, filter: 'articulo' }
          }
        }
      }
    }

    if (!!this.selectedDirector && this.selectedDirector.cedula != '0') {
      filter2 = { filter: 'director', value: this.selectedDirector.cedula }
      if (!!this.selectedGerente && this.selectedGerente.cedula != '0') {
        filter2 = { filter: 'gerente', value: this.selectedGerente.cedula }
        if (!!this.selectedCoordi && this.selectedCoordi.cedula != '0') {
          filter2 = { filter: 'coordinador', value: this.selectedCoordi.cedula }
          if (!!this.selectedLider && this.selectedLider.cedula != '0') {
            filter2 = { filter: 'lider', value: this.selectedLider.cedula }
          }
        }
      }
    }

    return [ filter1, filter2].filter(f => f)
  }

  pageSelected(event){
    this.currentPage = event
    this.search()
  }

  rowSelected(event:{data:commentsReport['items'][0]}){
    this.selectedData = event.data
  }

}
