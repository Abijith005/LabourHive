import { Component, OnInit } from '@angular/core';
import { JobService } from '../userServices/job.service';
import { i_engagedJobs } from 'src/app/interfaces/userInterfaces/i_jobDetails';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-engaged-jobs',
  templateUrl: './engaged-jobs.component.html',
  styleUrls: ['./engaged-jobs.component.css'],
})
export class EngagedJobsComponent implements OnInit {
  // variable declarations

  hideDescription:boolean=true
  engagedJobDatas$: Observable<i_engagedJobs[]> | null = null;

  constructor(private _jobService: JobService,
    _jobServices:JobService
    ) {}

  ngOnInit(): void {
    this.engagedJobDatas$ = this._jobService.getEngagedJobs().pipe(map((data:{engagedJobs:i_engagedJobs[],success:boolean,message:string})=>{
      return data.engagedJobs
    }))
}

toggleDecsription(){
this.hideDescription=!this.hideDescription
}

cancelJob(hire_id:string){
this._jobService.cancelJob(hire_id).subscribe()
}

}
