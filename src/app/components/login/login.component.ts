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
    @ViewChild('box', { static: false }) box: ElementRef;
    @ViewChild('usuario', { static: false }) usuario: ElementRef;
    @ViewChild('password', { static: false }) password: ElementRef;    

    slide = false;
    initialPos = 0 ;
    initialInnerOfset = 0;
    captchaValidado = false

    public captchaToken:string = '';
    isLoginError = false
    isBotError = false
    captchaCheked = false
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
            this.initialPos = this.box.nativeElement.getBoundingClientRect().left;
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
            
            this.box.nativeElement.style.left = 0
            this.slide = false;        
            this.initialPos = this.box.nativeElement.getBoundingClientRect().left;
            this.initialInnerOfset = 0;
            this.captchaCheked = false
    }

    mouseDown(e){
        this.slide = true;        
        this.initialInnerOfset = e.offsetX;
    }

    mouseUp(e){
        this.slide = false;
    }

    mouseMove(e){
        if(!this.captchaCheked){
            let posX = e.clientX;            
            let diferencia  = (posX - this.initialPos) - this.initialInnerOfset;
            
            if(( diferencia + 48 ) >= 300){
                this.validado()
                return
            }

            if(this.slide && !this.captchaCheked && diferencia > 0 ){
                this.box.nativeElement.style.left = diferencia + "px";
            } else {
                this.box.nativeElement.style.left = 0;
            }
        }
    }

    validado(){
        console.log('validado')
        this.captchaCheked = true
        this.login()
    }

}