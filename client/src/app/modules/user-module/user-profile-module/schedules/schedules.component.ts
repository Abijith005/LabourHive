import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../userServices/user-profile.service';
import { i_userSchedule } from 'src/app/interfaces/userInterfaces/i_userSchedule';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { JobInfoComponent } from '../job-info/job-info.component';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css'],
})
export class SchedulesComponent implements OnInit {
  // variable declaration
  weekSchedule: i_userSchedule []|[]=[];

  constructor(private _profileService: UserProfileService,
    private _datePipe:DatePipe,
    private _matDialog:MatDialog) {}
  ngOnInit(): void {
    this._profileService.getSchedules().subscribe((res) => {
      this.weekSchedule=res

    });
  }

  viewJob(hire_id:string){
    this._matDialog.open(JobInfoComponent,{
      maxWidth:'700px',
      data:hire_id
    })

  }

 
  
  
  
}
