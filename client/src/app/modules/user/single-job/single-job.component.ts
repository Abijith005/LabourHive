import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { i_jobDetails } from 'src/app/interfaces/userInterfaces/i_jobDetails';
import { userDataState } from 'src/app/store/user.state';
import { JobService } from '../userServices/job.service';
import { SwalService } from 'src/app/services/commonServices/swal.service';
import { HelperService } from 'src/app/services/commonServices/helper.service';

@Component({
  selector: 'app-single-job',
  templateUrl: './single-job.component.html',
  styleUrls: ['./single-job.component.css'],
})
export class SingleJobComponent implements OnDestroy {
  jobDetails!: i_jobDetails;

  private _unsubscribe$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: i_jobDetails,
    private _matDialogRef: MatDialogRef<SingleJobComponent>,
    private _store: Store<userDataState>,
    private _jobService: JobService,
    private _swalService: SwalService,
    private _toasterService: HelperService
  ) {
    this.jobDetails = this._data;
  }

  close() {
    this._matDialogRef.close();
  }

  applyJob(job_id: string) {
    this._store
      .select('user')
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        if (res.userDatas?.isLoggedIn) {
          this._jobService
            .applyjob(job_id)
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((res) => {
              if (res.success) {
                this._swalService.showAlert('Success', res.message, 'success');
              } else {
                this._swalService.showAlert('Failed', res.message, 'error');
              }
            });
        } else {
          this._toasterService.showToaster('Please login for applying', false);
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
