import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { i_applicantsData } from 'src/app/interfaces/userInterfaces/i_jobDetails';

@Component({
  selector: 'labourHive-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css'],
})
export class ViewApplicantsComponent {
  // variable decalrations

  applicatsData: i_applicantsData[] | [] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private _data: i_applicantsData[],
  private _matDialogRef:MatDialogRef<ViewApplicantsComponent>
  ) {
    this.applicatsData = _data;
  }

  close()
{
this._matDialogRef.close()
}}
