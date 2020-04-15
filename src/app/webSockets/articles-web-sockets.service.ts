import { Injectable } from '@angular/core';
import { tap, map, distinctUntilChanged, scan, filter } from 'rxjs/operators';
import io from 'socket.io-client';
import { Article } from "../article";
import { StateService } from "../services/state.service";
import { UserService } from "../services/user.service";
import { BehaviorSubject } from 'rxjs';

export type state = {
  newArticleNotification:newArticleNotificatonDTO | null,  
  notificationsOpen:boolean
}

export type notification = {
  notificationTitle:string,
  date:string
}

export type newArticleNotificatonDTO = notification & {
  data: Partial<Article>
}


@Injectable({
  providedIn: 'root'
})
export class ArticlesWebSocketsService {

  private _state:state = {
    newArticleNotification:null,
    notificationsOpen:false
  }

  private store = new BehaviorSubject<state>(this._state)
  
  private state$ = this.store.asObservable();

  public notificationsOpen$ = this.state$.pipe(map(_state => _state.notificationsOpen), distinctUntilChanged())
  public newArticleNotification$ = this.state$.pipe(map(_state => _state.newArticleNotification), distinctUntilChanged())
  public newArticleNotifications$ = this.state$.pipe(
    map(_state => _state.newArticleNotification),
    distinctUntilChanged(),
    filter(item => !!item),
    map(item => [item]),
    scan((acum, item, index) => [...acum, ...item]),
    tap(items => console.log(items))
    )

  private socket 

  constructor(
    private userService:UserService,
    private state:StateService,
  ) {    
    this.socket = io('http://localhost:3001/articles',{ query:{ cedula: userService.usuario.sub }})

    this.socket.on('connect', () => {
      this.socket.on('newarticle', data => {
        this.store.next(this._state = { ...this._state, newArticleNotification: JSON.parse(data) })
      })
    });

    this.state.selectedPcrc$.pipe(
      tap(pcrc => {
        this.subscribeToRoom(pcrc.id_dp_pcrc.toString())
      })
    ).subscribe()
  }

  public subscribeToRoom(roomId:string){
    this.socket.emit('subcribe', roomId )
  }

  public sendNewArticleNotification(data:newArticleNotificatonDTO['data']){
    let notificationDTO: newArticleNotificatonDTO = {
      notificationTitle:'new article',
      date: (new Date()).getTime().toString(),
      data: data
    }

    this.socket.emit('newarticle', JSON.stringify(notificationDTO))
  }

  public togleNotifications(){
    this.store.next(this._state = { ...this._state, notificationsOpen: !this._state.notificationsOpen })
  }

}
