import { Component, OnInit, Input } from '@angular/core';
import { newArticleNotificatonDTO } from "../../webSockets/articles-web-sockets.service";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ArticlesWebSocketsService } from "../../webSockets/articles-web-sockets.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() notification:newArticleNotificatonDTO;
  

  constructor(
    private router: Router,
    private articlesWebSockets: ArticlesWebSocketsService,
  ){  }

  ngOnInit() {
  }

  goToArticle(){
    this.articlesWebSockets.togleNotifications()
    this.router.navigate(['/app/articles/' + this.notification.data.id])
  }

}
