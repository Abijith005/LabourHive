import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostJobComponent } from '../post-job/post-job.component';

@Component({
  selector: 'labourHive-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css'],
})
export class MyJobsComponent implements OnInit {
  // variable declaration
  posted: boolean = true;
  engaged: boolean = false;

  constructor(
    private _matDialog: MatDialog,
  ) {}
  ngOnInit(): void {
 
  }

  changeActive(value: string) {
    if (value == 'posted') {
      this.posted = true;
      this.engaged = false;
    } else {
      this.posted = false;
      this.engaged = true;
    }
  }

  openPostjob() {
    this._matDialog.open(PostJobComponent, {
      width: '520px',
      disableClose: true,
    });
  }
}
