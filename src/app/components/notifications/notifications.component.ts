import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArticlesWebSocketsService } from "../../webSockets/articles-web-sockets.service";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications:number = 0;

  @ViewChild('focus',{ static:true }) focus: ElementRef;


  constructor( 
    public articlesWebSockets:ArticlesWebSocketsService
  ) { }

  ngOnInit() {
    this.articlesWebSockets.notifications$.pipe(
      tap(notifications => this.notifications = notifications.length)
    ).subscribe()

    this.articlesWebSockets.notificationsOpen$.subscribe(value =>{
      if(value){
        this.focus.nativeElement.focus();
      }
    })
  }

  clearAllNotifications(){
    this.articlesWebSockets.deleteAllNotifications()
  }

  hidePanel(){
    this.articlesWebSockets.togleNotifications()
  }

}
