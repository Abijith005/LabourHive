import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private _http:HttpClient) { }

  getHistory(){
    return this._http.get<any>(`/profile/history`)
  }
}
