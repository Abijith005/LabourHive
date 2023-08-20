import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobService } from '../userServices/job.service';
import { Subject, takeUntil } from 'rxjs';
import { i_applicantsData, i_jobDetails, i_postedJobs } from 'src/app/interfaces/userInterfaces/i_jobDetails';
import { MatDialog } from '@angular/material/dialog';
import { ViewApplicantsComponent } from '../components/view-applicants/view-applicants.component';
import { EditJobComponent } from '../components/edit-job/edit-job.component';

@Component({
  selector: 'app-posted-jobs',
  templateUrl: './posted-jobs.component.html',
  styleUrls: ['./posted-jobs.component.css'],
})
export class PostedJobsComponent implements OnInit, OnDestroy {
  // variable declarations
  postedJobData: i_postedJobs[] | [] = [];

  private _unsubscribe$ = new Subject<void>();

  constructor(private _jobService: JobService,
    private _matDialog:MatDialog) {}

  ngOnInit(): void {
    this._jobService
      .getPostedjobs()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        if (res.success) {
          this.postedJobData = res.jobs;
        }
      });
  }

  veiwApplicants(applicants:i_applicantsData){
this._matDialog.open(ViewApplicantsComponent,{
  width:'950px',
  data:applicants
}
  )
  }
  editJob(data:i_jobDetails){
    this._matDialog.open(EditJobComponent,{
      width:'600px',
      data:data
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
