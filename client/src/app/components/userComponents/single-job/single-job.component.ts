import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { i_jobDetails } from 'src/app/interfaces/userInterfaces/i_jobDetails';

@Component({
  selector: 'app-single-job',
  templateUrl: './single-job.component.html',
  styleUrls: ['./single-job.component.css']
})
export class SingleJobComponent {

  jobDetails!:i_jobDetails

  constructor( @Inject(MAT_DIALOG_DATA) private _data:i_jobDetails){
    this.jobDetails=this._data
  }

}
