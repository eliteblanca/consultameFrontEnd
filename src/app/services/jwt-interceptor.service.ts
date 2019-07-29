import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
class JwtInterceptorService implements HttpInterceptor {

  constructor(private userService:UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
      let currentUser = this.userService.usuario; 
      if (currentUser) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          });
      }

      return next.handle(request);
  }
}

export const JwtInterceptor = { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }