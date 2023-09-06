import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WindowRefService } from '../../../services/commonServices/window-ref.service';
import { UserService } from './user.service';
import { SwalService } from '../../../services/commonServices/swal.service';
import { i_paymentDetails } from 'src/app/interfaces/userInterfaces/i_paymentDetails';
import { environment } from 'src/app/environments/environment';
import { PaymentService } from 'src/app/services/adminServices/payment.service';

@Injectable({
  providedIn: 'root',
})
export class RazorpayService implements OnDestroy {
  constructor(
    private _winRef: WindowRefService,
    private _service: UserService,
    private _swalService: SwalService,
    private _adminServices:PaymentService
  ) {}

  private _unsubscribe$ = new Subject();

  handleRazorpay(
    order: any,
    data: i_paymentDetails
  ): Promise<{ success: boolean }> {
    return new Promise<{ success: boolean }>((resolve, reject) => {
      const options: any = {
        key: environment.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Labour Hive',
        description: 'Hiring Payment',
        order_id: order.id,
        handler: (response: any) => {
          this._service
            .verifyPayment({ ...response, ...data })
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((res) => {
              if (!res.success) {
                reject({ success: false });
              } else {
                resolve({ success: true });
              }
            });
        },
      };

      const rzp = new this._winRef.nativeWindow.Razorpay(options);
      rzp.open();
      rzp.on('payment.failed', (response: any) => {
        this._swalService.showAlert(
          'Payment Failed',
          'Unknown error please try again',
          'error'
        );
      });
    });
  }

  adminHandleRazorpay(order:any,_id:string): Promise<{ success: boolean }> {
    return new Promise<{ success: boolean }>((resolve, reject) => {
      const options: any = {
        key: environment.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Labour Hive',
        description: 'Wage Payment',
        order_id: order.id,
        handler: (response: any) => {
          this._adminServices
            .adminPaymentVerify({ ...response,_id })
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((res) => {
              if (!res.success) {
                reject({ success: false });
              } else {
                resolve({ success: true });
              }
            });
        },
      };

      const rzp = new this._winRef.nativeWindow.Razorpay(options);
      rzp.open();
      rzp.on('payment.failed', (response: any) => {
        this._swalService.showAlert(
          'Payment Failed',
          'Unknown error please try again',
          'error'
        );
      });
    });
  }
  
  
  adminHandleRazorpayRefund(order:any,_id:string): Promise<{ success: boolean }> {
    return new Promise<{ success: boolean }>((resolve, reject) => {
      const options: any = {
        key: environment.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Labour Hive',
        description: 'Payment Refund',
        order_id: order.id,
        handler: (response: any) => {
          this._adminServices
            .adminPaymentVerify({ ...response,_id })
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((res) => {
              if (!res.success) {
                reject({ success: false });
              } else {
                resolve({ success: true });
              }
            });
        },
      };

      const rzp = new this._winRef.nativeWindow.Razorpay(options);
      rzp.open();
      rzp.on('payment.failed', (response: any) => {
        this._swalService.showAlert(
          'Payment Failed',
          'Unknown error please try again',
          'error'
        );
      });
    });
  }
  ngOnDestroy(): void {
    this._unsubscribe$.complete();
  }
}
