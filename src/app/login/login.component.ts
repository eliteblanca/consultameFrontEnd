import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from "../services/index";

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('usuario',{static:false}) usuario: ElementRef;
  @ViewChild('password',{static:false}) password: ElementRef;

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit() {
  }

  login():void{
    if(this.usuario.nativeElement.value && this.password.nativeElement.value){
      this.api.login(this.usuario.nativeElement.value,this.password.nativeElement.value)
      .subscribe(val=>{
        console.log(val)
        if(val){
          this.router.navigate(['/app']);
        }
      })
    }
  }

}
