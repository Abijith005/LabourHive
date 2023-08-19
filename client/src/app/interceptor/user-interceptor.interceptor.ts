import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserAuthService } from '../modules/user/userServices/user-auth.service';

@Injectable()
export class UserInterceptorInterceptor implements HttpInterceptor {
  constructor(private _authService: UserAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = this._authService.getToken();
    console.log(token, 'interrrrr');

    // console.log('iam intercetor',request);

    //Excluding Mapbox requests being interrupted

    const isMapboxRequest = request.url.includes('api.mapbox.com');
    if (isMapboxRequest) {
      return next.handle(request);
    }

    //Modifying requests

    let modifiedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      url: environment.API_URL + request.url,
    });

    return next.handle(modifiedRequest);
  }
}
