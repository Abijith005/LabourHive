import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AdminWalletManagementService } from 'src/app/services/adminServices/admin-wallet-management.service';
import { RazorpayService } from '../../user-module/userServices/razorpay.service';
import { SwalService } from 'src/app/services/commonServices/swal.service';
import { PaymentService } from 'src/app/services/adminServices/payment.service';
import { i_walletDatas } from 'src/app/interfaces/adminInterfaces/i_walletDatas';

@Component({
  selector: 'labourHive-wallet-mangement',
  templateUrl: './wallet-mangement.component.html',
  styleUrls: ['./wallet-mangement.component.css'],
})
export class WalletMangementComponent implements OnInit, OnDestroy {
  // variable declarations
  walletDetails: i_walletDatas[]|[] = [];

  private _Unsubscribe$=new Subject<void>()

  private _unsubscribe$ = new Subject<void>();

  constructor(private _walletManagement: AdminWalletManagementService,
    private _service:PaymentService,
    private _razorpayService:RazorpayService,
    private _swalService:SwalService,
    private _paymentService:PaymentService) {}

  ngOnInit(): void {
    this._walletManagement
      .getWalletDetails()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {        
        this.walletDetails = res;
      });
  }

  confirmPayment(request_id:string,amount:number,balance:number,user_id:string){

    // this._service.payment(amount)

    this._service
      .payment(amount,request_id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        if (res.success) {
          //confirming payment and verfying
          this._razorpayService
            .adminHandleRazorpay(res.order, request_id)
            .then(async (res) => {
              if (res.success) {
                this.walletDetails.map(data=>{
                  if (data.user_id._id===user_id) {
                    data.user_id.wallet-=amount
                    data.status='approved'
                  }
                })
                const confirmation = await this._swalService.showAlert(
                  'Payment Success ',
                  'Payment To User Successfully Done',
                  'success'
                );
              } else {
                this._swalService.showAlert(
                  'Payment Failed ',
                  'payment verification failed',
                  'error'
                );
              }
            });
        } else {
          this._swalService.showAlert(
            'Ooops!!',
            res.message,
            'error'
          );
        }
      });
    
  }

  rejectRequest(request_id:string){
    this._paymentService.rejectwithdrawRequest(request_id).pipe(takeUntil(this._unsubscribe$)).subscribe(res=>{
    const title=res.success?'success':'Failed'
    this._swalService.showAlert(title,res.message,title)
    if (res.success) {
      this.walletDetails.map(data=>{
        if (data._id===request_id) {
          data.status='rejected'
        }
      })
    }
    })
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._Unsubscribe$.complete()
  }
}
