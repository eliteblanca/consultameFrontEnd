import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from "rxjs/operators";
import { PcrcApiService } from "../../api/pcrc-api.service";
import { EventsService } from "../../services/index";
import { StateService } from "../../services/state.service";
@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, AfterViewInit {

    @Output() nuevaBusqueda = new EventEmitter();
    @ViewChild('busqueda', { static: false }) busqueda: ElementRef;

    suggestions: { selected: boolean, value: string }[] = [];
    textoDeBusqueda:string;
    public onkeydown$: Observable<KeyboardEvent>;
    public onArrows$: Observable<KeyboardEvent>;
    public onEnter$: Observable<KeyboardEvent>;
    public onNewWord$: Observable<string>;

    constructor(
        public events: EventsService,
        public PcrcApiService: PcrcApiService,
        public state: StateService
    ) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.onkeydown$ = fromEvent(this.busqueda.nativeElement, 'keydown');

        this.onEnter$ = this.onkeydown$.pipe(
            filter(({ code }) => code == 'Enter')
        )

        this.onArrows$ = this.onkeydown$.pipe(
            filter(({code})=>{
                return code == 'ArrowUp' || code == 'ArrowDown'
            }),
            tap(event => {
                event.preventDefault()
            }),
            tap(({code})=>{

                let currentSelectedIndex =  this.suggestions.findIndex(data => {
                    return data.selected
                })

                if(code == 'ArrowUp'){
                    if(currentSelectedIndex > 0){
                        this.suggestions[currentSelectedIndex].selected = false;
                        this.suggestions[currentSelectedIndex - 1].selected = true;
                    }

                    if(currentSelectedIndex == 0){
                        this.suggestions[currentSelectedIndex].selected = false;
                    }
                }

                if(code == 'ArrowDown'){
                    if(currentSelectedIndex < this.suggestions.length - 1 && currentSelectedIndex >= 0){
                        this.suggestions[currentSelectedIndex].selected = false;
                        this.suggestions[currentSelectedIndex + 1].selected = true;
                    }

                    if(currentSelectedIndex == -1){
                        this.suggestions[0].selected = true;
                    }
                }
            })
        )

        this.onEnter$.subscribe(val => {
            if (this.suggestions.find(x => x.selected)) {
                this.textoDeBusqueda = this.suggestions.find(x => x.selected).value;
                this.suggestions[this.suggestions.findIndex(x => x.selected)].selected = false;
                this.getSuggestions(this.textoDeBusqueda);
            } else if (this.textoDeBusqueda) {
                this.buscar();
            }
        });

        this.events.onNewQuery$.subscribe(query => {
            this.buscar(query);
        })

        this.onArrows$.subscribe()
    }

    buscar(value?: string): void {
        if (value) {
            this.events.newSearch(value);
            this.busqueda.nativeElement.value = value;
        } else {
            this.events.newSearch(this.getInputValue());
        }
    }

    getSuggestions(input: string) {
        this.PcrcApiService.getSuggestions(this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString(), input).pipe(
            map(suggestions => suggestions.map(suggestion => {
                return { selected: false, value: suggestion }
            })),
            tap(suggestions => {
                this.suggestions = suggestions.slice(0, 10);
            })
        ).subscribe()
    }

    onFocus() {
        if(this.textoDeBusqueda){
            this.getSuggestions(this.textoDeBusqueda);
        }else{

        }
    }

    onFocusout() {
        this.suggestions = [];
    }

    setCaretToPos(input, pos) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(pos, pos);
        }
        else if (input.createTextRange) {
            var savedTabIndex = input.getAttribute('tabindex');
            input.setAttribute('tabindex', '-1');
            input.focus();
            input.setAttribute('tabindex', savedTabIndex);
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    getInputValue(): string {
        return this.busqueda.nativeElement.value
    }

    textChange(){
        if(this.textoDeBusqueda){
            this.getSuggestions(this.textoDeBusqueda)
        } else {
            this.suggestions = [];
        }
    }
}