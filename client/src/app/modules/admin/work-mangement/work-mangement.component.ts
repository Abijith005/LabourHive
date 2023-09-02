import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AdminJobManagementService } from 'src/app/services/adminServices/admin-job-management.service';

@Component({
  selector: 'labourHive-work-mangement',
  templateUrl: './work-mangement.component.html',
  styleUrls: ['./work-mangement.component.css'],
})
export class WorkMangementComponent implements OnInit, OnDestroy {
  // variable declarations
  jobDetails: any = null;

  private _unsubscribe$ = new Subject<void>();

  constructor(private _jobManagementService: AdminJobManagementService) {}

  ngOnInit(): void {
    this._jobManagementService
      .getJobDetails()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.jobDetails = res;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
