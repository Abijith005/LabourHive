import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WindowRefService } from '../commonServices/window-ref.service';
import { UserService } from './user.service';
import { SwalService } from '../commonServices/swal.service';
import { i_paymentDetails } from 'src/app/interfaces/userInterfaces/i_paymentDetails';
import { environment } from 'src/app/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class RazorpayService implements OnDestroy {

  constructor(private _winRef:WindowRefService,
    private _service:UserService,
    private _swalService:SwalService){}

    private _unsubscribe$ = new Subject()

  handleRazorPay(order: any, data: i_paymentDetails) {
    const options: any = {
      key: environment.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Labour Hive",
      description: "Hiring Payment",
      order_id: order.id,
      handler: (response: any) => {
        this._service.verifyPayment({ ...response, ...data }).pipe(takeUntil(this._unsubscribe$)).subscribe((res) => {

          if (!res.success) {
            this._swalService.showAlert('Payment Failed ', res.message, 'error')
          } else {

            this._swalService.showAlert('Payment Success ', res.message, 'success')
          }
        })
      }
    }

    const rzp = new this._winRef.nativeWindow.Razorpay(options);
    rzp.open();
    rzp.on('payment.failed', (response:any) => {
      this._swalService.showAlert("Payment Failed",'Unknown error please try again','error')
    })
    
   ;
  }


  ngOnDestroy(): void {
    this._unsubscribe$.complete()
  }


}