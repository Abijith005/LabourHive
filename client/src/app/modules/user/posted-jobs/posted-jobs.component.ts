import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobService } from '../userServices/job.service';
import { Subject, takeUntil } from 'rxjs';
import { i_postedJobs } from 'src/app/interfaces/userInterfaces/i_jobDetails';

@Component({
  selector: 'app-posted-jobs',
  templateUrl: './posted-jobs.component.html',
  styleUrls: ['./posted-jobs.component.css']
})
export class PostedJobsComponent implements OnInit,OnDestroy {

  // variable declarations
  postedJobData:i_postedJobs|null=null


  private _unsubscribe$=new Subject<void>()

  constructor(
    private _jobService:JobService
  ){}

  ngOnInit(): void {
    this._jobService.getPostedjobs().pipe(takeUntil(this._unsubscribe$)).subscribe(res=>{
// if (res.) {
  console.log(res);
  
// }
    })
  }




  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }
}
