import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class UserInterceptorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    
    let modifiedRequest = request.clone({
      setHeaders:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${token}'
      },
      withCredentials:true,
      url: environment.apiUrl + request.url
    })
    return next.handle(modifiedRequest);
  }
}
