import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  public newSearchSource:BehaviorSubject<string> = new BehaviorSubject('');
  public newQuerySource:BehaviorSubject<string> = new BehaviorSubject('');
  public onNewSearch$ = this.newSearchSource.asObservable();
  public onNewQuery$ = this.newQuerySource.asObservable();
  
  constructor() { }

  newSearch(input:string):void{
    this.newSearchSource.next(input);
  }
  newQuery(input:string):void{
    this.newQuerySource.next(input);
  }
}