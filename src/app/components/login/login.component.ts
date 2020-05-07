import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticateApiService } from "../../api/autenticate-api.service";
import { RecaptchaComponent } from 'ng-recaptcha'


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

    @ViewChild(RecaptchaComponent , { static: false }) recaptcha:RecaptchaComponent;
    @ViewChild('usuario', { static: false }) usuario: ElementRef;
    @ViewChild('password', { static: false }) password: ElementRef;    

    public captchaToken:string = '';
    isLoginError = false
    isBotError = false
    captchaCheked = false
    isUserPassFieldsError = false
    isLoading = false

    constructor(
        private autenticateApi: AutenticateApiService,
        private router: Router
    ) { }

    ngOnInit() { }

    ngAfterViewInit() {
        setTimeout(() => {
            this.usuario.nativeElement.focus();
        }, 0);
    }   

    login(): void {

        if( !(this.usuario.nativeElement.value && this.password.nativeElement.value) ){
            this.isUserPassFieldsError = true
        } else {
            this.isUserPassFieldsError = false
        }        
        
        if( !this.isUserPassFieldsError && this.captchaCheked){
            this.isLoginError = false;    
            this.isLoading = true;

            this.autenticateApi.login(this.usuario.nativeElement.value, this.password.nativeElement.value)
                .subscribe(autenticated => {
    
                    if (autenticated) {
                        this.router.navigate(['/app']);
                    } else {
                        this.isLoginError = true
                    }
    
                    this.isLoading = false
    
                }, (error: httpError) => {
                    if (error.statusText == 'Unauthorized') {
                        this.isLoginError = true
                        this.isLoading = false
                    }
                })
        }
        
    }

    enter(event: KeyboardEvent) {
        if (event.key == "Enter") {
            this.login()
        }
    }

    captchaResolved(token:string){

        this.captchaToken = token;

        if(token){
            this.autenticateApi.validateCaptcha(token).subscribe(response =>{
                if(response.success){
                    this.captchaCheked = true
                    this.isBotError = false
                } else {
                    this.captchaCheked = false
                    this.isBotError = true
                    this.recaptcha.reset()
                }
            })
        }
    }
}