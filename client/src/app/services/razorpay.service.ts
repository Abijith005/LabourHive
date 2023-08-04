import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import Razorpay from 'razorpay';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  private _razorPay: any

  constructor(private _http: HttpClient) {
    this._razorPay = new Razorpay({
      key_id: environment.RAZORPAY_KEY_ID
    })
  }

  createPaymentOrder(amount: number): Promise<string> {
    
    return this._http.get<any>(`/getPaymentId`)

  }
}
