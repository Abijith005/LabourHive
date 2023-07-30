import { Component } from '@angular/core';
import { CreatejobProfileComponent } from '../createjob-profile/createjob-profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'labourHive-job-profile',
  templateUrl: './job-profile.component.html',
  styleUrls: ['./job-profile.component.css']
})
export class JobProfileComponent {

  constructor(private matDialog:MatDialog){}


  openDialogEditCategory(){
        
    this.matDialog.open(CreatejobProfileComponent,{
      width:'450px',
      height:'900px',
      disableClose:true
    })
  }

  

}
