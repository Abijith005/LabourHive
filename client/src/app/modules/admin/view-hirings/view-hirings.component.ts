import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { i_hirings } from 'src/app/interfaces/adminInterfaces/i_hirings';
import { AdminJobManagementService } from 'src/app/services/adminServices/admin-job-management.service';
import { SwalService } from 'src/app/services/commonServices/swal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-hirings',
  templateUrl: './view-hirings.component.html',
  styleUrls: ['./view-hirings.component.css'],
})
export class ViewHiringsComponent implements OnInit, OnDestroy {
  // variable declarations

  hiringDatas: i_hirings[] | null = null;

  private _unsubscribe$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private _job_id: string,
    private _matDialogRef: MatDialogRef<ViewHiringsComponent>,
    private _jobManagement: AdminJobManagementService,
    private _swalService: SwalService
  ) {}

  ngOnInit(): void {
    this._jobManagement.getHirings(this._job_id).subscribe((res) => {
      this.hiringDatas = res;
    });
  }

  viewComplaint(compalint: { complaintText: string }) {
    Swal.fire(compalint.complaintText);
  }
  async payment(
    hire_id: string,
    payment: boolean,
    labour_id: string,
    amount: number
  ) {
    const message = payment
      ? 'Do you want to approve the payment'
      : 'Do you want to reject the payment';
    const confirmation = await this._swalService.showConfirmation(
      'Payment To Labour',
      message,
      'warning'
    );
    if (confirmation) {
      this._jobManagement
        .updatePayment(hire_id, payment, labour_id, amount)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((res) => {
          if (res.success) {
            this.hiringDatas?.map(data=>{
              if (data._id===hire_id) {
                const status=payment?'approved':'rejected'
                data.paymentToLabour=status
              }
            })
          }
          const title = res.success ? 'success' : 'error';
          this._swalService.showAlert(title, res.message, title);
        });
    }
  }

  close() {
    this._matDialogRef.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
