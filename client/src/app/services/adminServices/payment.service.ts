import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _http: HttpClient) {}

  adminRefund(amount: number, hire_id: string, razorPay_id: string) {
    return this._http.post<i_authRes>(`/admin/adminRefund`, {
      amount,
      hire_id,
      razorPay_id,
    });
  }

  payment(amount: number, request_id: string) {
    return this._http.post<i_authRes & any>(`/admin/adminPayment`, {
      amount,
      request_id,
    });
  }

  adminPaymentVerify(data: any) {
    return this._http.post<i_authRes>(`/admin/verifyPayment`, data);
  }

  rejectwithdrawRequest(request_id: string) {
    return this._http.patch<i_authRes>(`/admin/rejectWithdrawRequest`, {
      request_id,
    });
  }
}
