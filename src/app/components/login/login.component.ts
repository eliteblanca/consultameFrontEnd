import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AutenticateApiService } from "../../api/autenticate-api.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @ViewChild('usuario', { static: false }) usuario: ElementRef;
    @ViewChild('password', { static: false }) password: ElementRef;

    constructor(
        private autenticateApi: AutenticateApiService,
        private router: Router) { }

    ngOnInit() { }

    login(): void {
        if (this.usuario.nativeElement.value && this.password.nativeElement.value) {
            this.autenticateApi.login(this.usuario.nativeElement.value, this.password.nativeElement.value)
                .subscribe(autenticated => {
                    if (autenticated) {
                        // window.setTimeout(()=>{
                        //     localStorage.removeItem('token')
                        //     this.router.navigate(['login'])
                        // },
                        //     (new JwtHelperService()).getTokenExpirationDate(localStorage.getItem("token")).getTime()
                        // )

                        this.router.navigate(['/app']);
                    }
                })
        }
    }

    enter(event:KeyboardEvent){
        if(event.key == "Enter"){
            this.login()
        }
    }
}