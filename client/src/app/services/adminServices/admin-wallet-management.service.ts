import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { i_walletDatas } from 'src/app/interfaces/adminInterfaces/i_walletDatas';

@Injectable({
  providedIn: 'root'
})
export class AdminWalletManagementService {

  constructor(private _http:HttpClient) { }

  getWalletDetails(){
    return this._http.get<i_walletDatas[]>(`/admin/getWalletDatas`)
  }
}
