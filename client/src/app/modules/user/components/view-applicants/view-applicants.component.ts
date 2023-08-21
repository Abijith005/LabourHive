import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { i_applicantsData } from 'src/app/interfaces/userInterfaces/i_jobDetails';
import { JobService } from '../../userServices/job.service';
import { Subject, takeUntil } from 'rxjs';
import { SwalService } from 'src/app/services/commonServices/swal.service';

@Component({
  selector: 'labourHive-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css'],
})
export class ViewApplicantsComponent implements OnDestroy {
  // variable decalrations

  applicatsData: i_applicantsData[] | [] = [];
  currentJobStatus!: string;

  private _unsubscribe$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private _data: { applicants: i_applicantsData[]; currentStatus: string },
    private _matDialogRef: MatDialogRef<ViewApplicantsComponent>,
    private _jobService: JobService,
    private _swalService: SwalService
  ) {
    this.applicatsData = _data.applicants;
    this.currentJobStatus = _data.currentStatus;
  }

  close() {
    this._matDialogRef.close();
  }

  async rejectApplication(application_id: string) {
    const confirmation = await this._swalService.showConfirmation(
      'Reject applicant',
      'Do you want reject the application',
      'warning'
    );
    if (confirmation) {
      this._jobService
        .updateApplcation(application_id,'rejected')
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((res) => {
          if (res.success) {
            this.applicatsData.map((data) => {
              if (data._id == application_id) {
                data.applicationStatus = 'rejected';
              }
            });
            this._swalService.showAlert('Success', res.message, 'success');
          } else {
            this._swalService.showAlert('Failed', res.message, 'error');
          }
        });
    } else {
      return;
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
