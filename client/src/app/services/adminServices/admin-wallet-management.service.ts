import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminWalletManagementService {

  constructor(private _http:HttpClient) { }

  getWalletDetails(){
    return this._http.get<any>(`/admin/getWalletDetails`)
  }
}
