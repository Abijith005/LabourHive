import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserProfileService } from '../../userServices/user-profile.service';
import { Subject, takeUntil } from 'rxjs';
import { i_userProfile } from 'src/app/interfaces/userInterfaces/i_userProfile';
import { JobService } from '../../userServices/job.service';
import { SwalService } from 'src/app/services/commonServices/swal.service';
import { MatDialog } from '@angular/material/dialog';
import { RatingComponent } from '../rating/rating.component';
import Swal from 'sweetalert2';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  // variable declarations
  historyData: i_userProfile[] | [] = [];

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _profileService: UserProfileService,
    private _jobService: JobService,
    private _swalService: SwalService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._profileService
      .getHistory()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.historyData = res.data;        
        
      });
  }

  async cancelHire(_id: string) {
    const confirmation = await this._swalService.showConfirmation(
      'Cancel Hiring',
      'Do you want to cancel the hiring',
      'warning'
    );
    if (confirmation) {
      this._jobService
        .cancelJob(_id)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((res) => {
          if (res.success) {
            this.historyData.map((data) => {
              if (data._id == _id) {
                data.hireStatus = res.currentStatus;
              }
            });
            this._swalService.showAlert('Success', res.message, 'success');
          }
        });
    } else {
      return;
    }
  }

  rateLabour(labour_id: string, hire_id: string) {
    const dialogRef = this._matDialog.open(RatingComponent, {
      width: '500px',
      disableClose: true,
      data: { labour_id, hire_id },
    });

    dialogRef.afterClosed().subscribe((review_id) => {
      this.historyData.map((data) => {
        if (data._id==hire_id) {
          data.review = review_id;
        }
      });
    });
  }

  complain(hire_id: string) {
    Swal.fire({
      title: 'Register complaint',
      input: 'textarea',
      customClass: {
        cancelButton: 'buttonsss',
        closeButton: 'buttonsss',
      },
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: (complaint) => {
        this._profileService
          .registerComplaint(complaint, hire_id)
          .pipe(takeUntil(this._unsubscribe$))
          .subscribe((res) => {
            if (res.success) {
              this.historyData.map((data) => {
                if (data._id === hire_id) {
                  data.complaint = { _id: res.complaint_id };
                }
              });
              this._swalService.showAlert('Success', res.message, 'success');
            } else {
              this._swalService.showAlert('Failed', res.message, 'error');
            }
          });
      },
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
