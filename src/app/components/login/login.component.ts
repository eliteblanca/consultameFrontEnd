import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticateApiService } from "../../api/autenticate-api.service";
import { SlideCaptchaComponent } from '../slide-captcha/slide-captcha.component'

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

    @ViewChild(SlideCaptchaComponent , { static: false }) recaptcha:SlideCaptchaComponent;
    @ViewChild('usuario', { static: false }) usuario: ElementRef;
    @ViewChild('password', { static: false }) password: ElementRef;    

    isLoginError = false
    isMessage:string
    isBotError = false
    isUserPassFieldsError = false
    isLoading = false

    constructor(
        private autenticateApi: AutenticateApiService,
        private router: Router,
        
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
            this.recaptcha.resetCaptcha()
        } else {
            this.isUserPassFieldsError = false
        }
        
        if( !this.isUserPassFieldsError && this.recaptcha.captchaValidado){
            this.isLoginError = false;    
            this.isLoading = true;

            this.autenticateApi.login(this.usuario.nativeElement.value, this.password.nativeElement.value)
                .subscribe(autenticated => {
                    if (autenticated.code==='200') {
                        this.router.navigate(['/app']);
                        this.isLoginError = false
                    } else {
                        this.isLoginError = true
                        this.isMessage=autenticated.message
                        this.recaptcha.resetCaptcha()
                    }
                    
                    this.isLoading = false
                    
                }, (error: httpError) => {
                    if (error.statusText == 'Unauthorized') {
                        this.isLoginError = true
                        this.isLoading = false
                        this.recaptcha.resetCaptcha()
                    }
                })
        }
    }
    
    captchaResolved(token:{ avSpeed: number, duration:number }){
        this.login()
    }
}