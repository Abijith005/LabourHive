import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { i_hireDatas } from 'src/app/interfaces/adminInterfaces/i_hirings';
import { AdminHireManagementService } from 'src/app/services/adminServices/admin-hire-management.service';
import { SwalService } from 'src/app/services/commonServices/swal.service';
import { RazorpayService } from '../../../pipes/user-module/userServices/razorpay.service';
import { PaymentService } from 'src/app/services/adminServices/payment.service';

@Component({
  selector: 'labourHive-hire-management',
  templateUrl: './hire-management.component.html',
  styleUrls: ['./hire-management.component.css'],
})
export class HireManagementComponent implements OnInit, OnDestroy {
  // variable declarataion
  hireDatas: i_hireDatas[] | [] = [];

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _hireService: AdminHireManagementService,
    private _swalService: SwalService,
    private _payment: PaymentService
  ) {}

  ngOnInit(): void {
    this._hireService.getAllHireDetails().subscribe((res) => {
      this.hireDatas = res;
    });
  }

  async approveCancel(hire_id: string, hireStatus: string) {
    const confirmation = await this._swalService.showConfirmation(
      'Approve Cancel',
      'Do you want to approve cancel hiring',
      'warning'
    );

    if (confirmation) {
      this._hireService
        .approveHireCancel(hire_id, hireStatus)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((res) => {
          const title = res.success ? 'success' : 'Failed';
          this._swalService.showAlert(title, res.message, title);
          if (res.success) {
            this.hireDatas.map((data) => {
              if (data._id === hire_id) {
                const status =
                  hireStatus === 'cancelRequested_labour'
                    ? 'cancelled_labour'
                    : 'cancelled_client';
                data.hireStatus = status;
              }
            });
          }
        });
    }
  }

  async refund(hire_id: string, amount: number, razorPay_id: string) {
    const confirmation = await this._swalService.showConfirmation(
      'Refund Payment',
      'Do you want to refund the payment to the client user',
      'warning'
    );

    if (confirmation) {
      this._payment
        .adminRefund(amount, hire_id, razorPay_id)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((res) => {
          if (res.success) {
          this.hireDatas.map(data=>{
            if (data._id===hire_id) {
              data.payment='refunded'
            }
          })
            this._swalService.showAlert(
              'Refund Processed ',
              res.message,
              'success'
            );
          } else {
            this._swalService.showAlert('Refund Failed ', res.message, 'error');
          }
        });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
