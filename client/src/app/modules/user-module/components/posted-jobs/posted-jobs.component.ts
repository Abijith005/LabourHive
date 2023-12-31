import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, map, of, takeUntil } from 'rxjs';
import {
  i_applicantsData,
  i_jobDetails,
  i_postedJobs,
} from 'src/app/interfaces/userInterfaces/i_jobDetails';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SwalService } from 'src/app/services/commonServices/swal.service';
import { JobService } from '../../userServices/job.service';
import { ViewApplicantsComponent } from '../view-applicants/view-applicants.component';
import { EditJobComponent } from '../edit-job/edit-job.component';

@Component({
  selector: 'app-posted-jobs',
  templateUrl: './posted-jobs.component.html',
  styleUrls: ['./posted-jobs.component.css'],
})
export class PostedJobsComponent implements OnInit, OnDestroy {
  // variable declarations
  postJobDatas$: Observable<i_postedJobs[]> | null = null;
  postedJobData: i_postedJobs[] | [] = [];

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _jobService: JobService,
    private _matDialog: MatDialog,
    private _swalServic: SwalService
  ) {}

  ngOnInit(): void {
    // getting post job datas from server
    this.postJobDatas$ = this._jobService
      .getPostedjobs()
      .pipe(map((res) => (res.success ? res.jobs : [])));
  }
  // opening view applicant component
  veiwApplicants(applicants: i_applicantsData,currentStatus:string) {
    this._matDialog.open(ViewApplicantsComponent, {
      width: '1100px',
      data: {applicants,currentStatus},
      disableClose: true,
    });
  }

  // opening edit job dialog box
  editJob(data: i_jobDetails) {
    const dialogRef: MatDialogRef<EditJobComponent> = this._matDialog.open(
      EditJobComponent,
      {
        width: '600px',
        data: data,
        disableClose: true,
      }
    );
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((updatedData: i_jobDetails) => {
        if (updatedData && this.postJobDatas$) {
          this.postJobDatas$ = this.postJobDatas$.pipe(
            map((datas) =>
              datas.map((job) => {
                if (job._id == updatedData._id) {
                  for (let prop in updatedData) {
                    if (
                      job.hasOwnProperty(prop) &&
                      updatedData.hasOwnProperty(prop)
                    ) {
                      job[prop] = updatedData[prop];
                    }
                  }
                  return job!;
                }
                return job;
              })
            )
          );
        }
      });
  }

  async changeJobStatus(job_id: string,status:string) {
    const confirmation = await this._swalServic.showConfirmation(
      'Expire Job',
      'Do you want to expire the job',
      'warning'
    );
    if (confirmation) {
      this._jobService
        .changeJobStatus(job_id,status)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((res) => {
          if (res.success) {
            if (this.postJobDatas$) {
              this.postJobDatas$ = this.postJobDatas$.pipe(
                map((data) =>
                  data.map((job) => {
                    if (job._id === job_id) {
                      job.currentStatus = 'expired';
                    }
                    return job;
                  })
                )
              );
            }
            this._swalServic.showAlert('Success', res.message, 'success');
          } else {
            this._swalServic.showAlert('Failed', res.message, 'error');
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
