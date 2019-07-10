import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { windowWhen } from 'rxjs/operators';

type user = {
  sub:string,
  name:string,
  rol:string,
  line:string,
  subLine:string
}

@Component({
  selector: 'app-acount-menu',
  templateUrl: './acount-menu.component.html',
  styleUrls: ['./acount-menu.component.css']
})
export class AcountMenuComponent implements OnInit {
  public user:user;
  public lines:string[];

  constructor(public api:ApiService, public router:Router) { }

  ngOnInit() {
    this.user = this.api.getCurrentUser();
    this.api.getUserLines(this.user.sub)
    .subscribe((lines)=>{
      this.lines = lines;
    })
  }

  changeLine(event){
    this.router.navigate(['/app/explore'],{ queryParams: { line: event.target.value },queryParamsHandling: 'merge' })
  }

}