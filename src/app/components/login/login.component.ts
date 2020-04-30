import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AutenticateApiService } from "../../api/autenticate-api.service";
import { Router } from '@angular/router';
import { OnExecuteData, ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

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

    private loginReCaptchaSubscription: Subscription;

    constructor(
        private autenticateApi: AutenticateApiService,
        private router: Router,
        private reCaptchaV3Service: ReCaptchaV3Service
    ) { }

    ngOnInit() { }

    ngAfterViewInit() {
        setTimeout(() => {
            this.usuario.nativeElement.focus();
        }, 0);
    }

    isError = false

    isLoading = false

    login(): void {
        if (this.loginReCaptchaSubscription) {
            this.loginReCaptchaSubscription.unsubscribe()
        }
        if (this.usuario.nativeElement.value && this.password.nativeElement.value) {
            this.isError = false
            this.isLoading = true
            this.loginReCaptchaSubscription = this.reCaptchaV3Service.execute('login').pipe(
                switchMap(token => {
                    return this.autenticateApi.validateCaptcha(token)
                }),                
                switchMap(response => {

                    if(response.score >= 0.5){
                        return this.autenticateApi.login(this.usuario.nativeElement.value, this.password.nativeElement.value)
                    }else{

                        console.log('recaptchaError')
                        return of(null)
                    }

                })
            ).subscribe(autenticated => {

                if (autenticated) {
                    this.router.navigate(['/app']);
                } else {
                    this.isError = true
                }

                this.isLoading = false

            }, (error: httpError) => {
                if (error.statusText == 'Unauthorized') {
                    this.isError = true
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
}