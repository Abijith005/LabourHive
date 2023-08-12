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

    // console.log('iam intercetor',request);
  
    //Excluding Mapbox requests being interrupted

    const isMapboxRequest=request.url.includes('api.mapbox.com')
    if (isMapboxRequest) {
      return next.handle(request)
    }
    
    //Modifying requests

    let modifiedRequest = request.clone({
      setHeaders:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${token}'
      },
      withCredentials:true,
      url: environment.API_URL + request.url
    })
    // console.log(modifiedRequest,'modiiiiiiiiiiiiiiiii');
    
    
    return next.handle(modifiedRequest);
  }
}
