import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _http:HttpClient) { }

  adminPaymentVerify(data: any) {
    return this._http.post<i_authRes>(`/admin/verifyPayment`, data);
  }

  payment(amount: number,request_id:string) {
    return this._http.post<i_authRes & any>(`/admin/adminPayment`, { amount,request_id});
  }

  rejectwithdrawRequest(request_id:string){
    return this._http.patch(`/admin/rejectWithdraw`,{request_id})
  }
}
