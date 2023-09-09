import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditBasicInfoComponent } from '../edit-basic-info/edit-basic-info.component';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
})
export class BasicInfoComponent {
  // varibel declaration
  name: string = '';
  email: string = 'abijithsurendran005@gmail.com';
  mobileNumber: string = '9986255038';

  constructor(private _matDialog:MatDialog) {}

  onEdit() {
    this._matDialog.open(EditBasicInfoComponent,{
      width:'400px'
    })
  }
}
