import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.getToken();
    let jwtToken = req.clone({
      setHeaders:{
        Authorization:'bearer ' + token
      }
    });
    return next.handle(jwtToken);
  }
}
