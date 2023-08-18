import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { i_jobDetails } from 'src/app/interfaces/userInterfaces/i_jobDetails';

@Component({
  selector: 'app-single-job',
  templateUrl: './single-job.component.html',
  styleUrls: ['./single-job.component.css']
})
export class SingleJobComponent {

  jobDetails!:i_jobDetails

  constructor( @Inject(MAT_DIALOG_DATA) private _data:i_jobDetails,
  private _matDialogRef:MatDialogRef<SingleJobComponent>
  ){
    this.jobDetails=this._data
  }

  close(){
    this._matDialogRef.close()
  }
  
  applyJob(job_id:string){

  }
}
