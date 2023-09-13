import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { i_jobDetails } from 'src/app/interfaces/userInterfaces/i_jobDetails';
import { JobService } from '../../userServices/job.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.css'],
})
export class JobInfoComponent implements OnInit, OnDestroy {
  // variable declarations
  jobDetails!: i_jobDetails;

  private _unsubscribe$ = new Subject<void>();
  constructor(
    @Inject(MAT_DIALOG_DATA) private hire_id: string,
    private _jobService: JobService,
    private _matDialogRef: MatDialogRef<JobInfoComponent>
  ) {}

  ngOnInit(): void {
    this._jobService
      .getJobInfo(this.hire_id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.jobDetails = res;
      });
  }

  close() {
    this._matDialogRef.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
