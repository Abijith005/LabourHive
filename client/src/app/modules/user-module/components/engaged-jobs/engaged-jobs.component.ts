import { Component, OnDestroy, OnInit } from '@angular/core';
import { i_engagedJobs } from 'src/app/interfaces/userInterfaces/i_jobDetails';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { SwalService } from 'src/app/services/commonServices/swal.service';
import { JobService } from '../../userServices/job.service';

@Component({
  selector: 'app-engaged-jobs',
  templateUrl: './engaged-jobs.component.html',
  styleUrls: ['./engaged-jobs.component.css'],
})
export class EngagedJobsComponent implements OnInit, OnDestroy {
  // variable declarations

  private _unsubscribe$ = new Subject<void>();
  hideDescription: boolean = true;
  engagedJobDatas: i_engagedJobs[]| [] = [];

  constructor(
    private _jobService: JobService,
    _jobServices: JobService,
    private _swalService: SwalService
  ) {}

  ngOnInit(): void {

    this._jobService.getEngagedJobs().pipe(takeUntil(this._unsubscribe$)).subscribe(res=>{
      this.engagedJobDatas=res.engagedJobs
    })
 
  }

  toggleDecsription() {
    this.hideDescription = !this.hideDescription;
  }

  async cancelJob(hire_id: string) {
    const confirmation = await this._swalService.showConfirmation(
      'Cancel Job',
      'Do you want request for cancel the job',
      'warning'
    );
    if (confirmation) {
      this._jobService
        .cancelJob(hire_id, 'labour')
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((res) => {
          console.log(res.success, res.message);
          const title = res.success ? 'success' : 'Failed';
          if (res.success) {
            this.engagedJobDatas.map(data=>{
              if (data._id===hire_id) {
                data.hireStatus='cancelRequested_labour'
              }
            })
          }
          this._swalService.showAlert(title, res.message, title);
        });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
