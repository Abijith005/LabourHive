import { Component, OnInit } from '@angular/core';
import { i_engagedJobs } from 'src/app/interfaces/userInterfaces/i_jobDetails';
import { Observable, map } from 'rxjs';
import { SwalService } from 'src/app/services/commonServices/swal.service';
import { JobService } from '../../userServices/job.service';

@Component({
  selector: 'app-engaged-jobs',
  templateUrl: './engaged-jobs.component.html',
  styleUrls: ['./engaged-jobs.component.css'],
})
export class EngagedJobsComponent implements OnInit {
  // variable declarations

  hideDescription: boolean = true;
  engagedJobDatas$: Observable<i_engagedJobs[]> | null = null;

  constructor(private _jobService: JobService, _jobServices: JobService,
    private _swalService:SwalService) {}

  ngOnInit(): void {
    this.engagedJobDatas$ = this._jobService.getEngagedJobs().pipe(
      map(
        (data: {
          engagedJobs: i_engagedJobs[];
          success: boolean;
          message: string;
        }) => {
          return data.engagedJobs;
        }
      )
    );
  }

  toggleDecsription() {
    this.hideDescription = !this.hideDescription;
  }

  async cancelJob(hire_id: string) {
    const confirmation=this._swalService.showConfirmation('Cancel Job','Do you want request for cancel the job','warning')
    console.log(confirmation);
    
    this._jobService.cancelJob(hire_id).subscribe();
  }
}
