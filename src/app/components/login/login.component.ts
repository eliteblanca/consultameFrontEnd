import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AutenticateApiService } from "../../api/autenticate-api.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

type httpError = {
    status: number;
    statusText: string
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {


    @ViewChild('usuario', { static: false }) usuario: ElementRef;
    @ViewChild('password', { static: false }) password: ElementRef;

    constructor(
        private autenticateApi: AutenticateApiService,
        private router: Router) { }

    ngOnInit() {  }
    
    ngAfterViewInit() {
        setTimeout(()=>{
            this.usuario.nativeElement.focus();
        },0);  
    }

    isError = false

    isLoading = false

    login(): void {
        if( this.usuario.nativeElement.value && this.password.nativeElement.value ){
            this.isError = false

            this.isLoading = true

            if (this.usuario.nativeElement.value && this.password.nativeElement.value) {
                this.autenticateApi.login(this.usuario.nativeElement.value, this.password.nativeElement.value)
                    .subscribe(autenticated => {
                        if (autenticated) {                  
                            this.router.navigate(['/app']);
                        } else {
                            this.isError = true
                        }

                        this.isLoading = false

                    },(error:httpError) => {
                        if(error.statusText == 'Unauthorized'){
                            this.isError = true
                            this.isLoading = false
                        }                            

                    })
            }

        }

    }

    enter(event:KeyboardEvent){
        if(event.key == "Enter"){
            this.login()
        }
    }
}