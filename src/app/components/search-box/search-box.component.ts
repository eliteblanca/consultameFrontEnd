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

    nextWord: string = "";
    lastWord: string = "";
    suggestions: { selected: boolean, value: string }[] = [];
    public onkeydown$: Observable<KeyboardEvent>;
    public onArrows$: Observable<KeyboardEvent>;
    public onEnter$: Observable<KeyboardEvent>;
    public onNewWord$: Observable<string>;
    public onWordCountChange$: Observable<string>;
    public onValueChange$: Observable<string>;

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

        this.onWordCountChange$ = this.onkeydown$.pipe(
            map(event => this.getInputValue(event).trim()),
            tap(text => {
                this.getSuggestions(text)
            })
        )

        this.onWordCountChange$.subscribe()       

        this.onEnter$.subscribe(val => {
            if (this.suggestions.find(x => x.selected)) {
                this.busqueda.nativeElement.value = this.suggestions.find(x => x.selected).value;
                this.suggestions[this.suggestions.findIndex(x => x.selected)].selected = false;
                this.getSuggestions(this.busqueda.nativeElement.value.trim());
            } else if (this.getInputValue()) {
                this.buscar();
            }
        });

        this.events.onNewQuery$.subscribe(query => {
            this.buscar(query);
        })
    }

    buscar(value?: string): void {
        if (value) {
            this.events.newSearch(value);
            this.busqueda.nativeElement.value = value;
        } else {
            this.events.newSearch(this.getInputValue());
        }
    }

    getSuggestions(input?: string) {
        this.state.selectedPcrc$.pipe(
            switchMap(pcrc => this.PcrcApiService.getSuggestions(pcrc.id_dp_pcrc.toString(), input)),
            map(suggestions => suggestions.map((suggestion) => {
                return { selected: false, value: suggestion['query'] }
            })),
            tap(suggestions => {
                this.suggestions = suggestions.slice(0, 10);
            })
        ).subscribe()
    }

    onFocus() {
        this.getSuggestions();
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

    compareWords(x: String, y: string): boolean {
        return new RegExp(`^${x.toLowerCase().replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')}.*$`).test(y.toLowerCase().replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u'))
            && x.toLowerCase().replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u') != y.toLowerCase().replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')
    }

    getInputValue($event?: KeyboardEvent): string {
        if ($event && $event.which >= 65 && $event.which <= 90) {
            return this.busqueda.nativeElement.value + $event.key;
        } else {
            return this.busqueda.nativeElement.value
        }
    }

}