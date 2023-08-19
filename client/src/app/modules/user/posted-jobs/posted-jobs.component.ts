import { Component, OnInit } from '@angular/core';
import { JobService } from '../userServices/job.service';

@Component({
  selector: 'app-posted-jobs',
  templateUrl: './posted-jobs.component.html',
  styleUrls: ['./posted-jobs.component.css']
})
export class PostedJobsComponent implements OnInit {

  constructor(
    private _jobService:JobService
  ){}

  ngOnInit(): void {
    this._jobService.getPostedjobs().subscribe()
  }
}
