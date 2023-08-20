import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserAuthService } from '../modules/user/userServices/user-auth.service';
import { catchError, tap, throwError } from 'rxjs';

@Injectable()
export class UserInterceptorInterceptor implements HttpInterceptor {
  constructor(private _authService: UserAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = this._authService.getToken();

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

    // return next.handle(modifiedRequest);

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error interceptor', error);
        return throwError(error);
      }),
      catchError((response: any) => {
        
        if (response instanceof HttpErrorResponse) {
          console.log('Response interceptor (HttpErrorResponse)', response);
        } else {
          console.log('Response interceptor (Other response)', response);
        }
        return throwError(response);
      })
    );
  }
}
