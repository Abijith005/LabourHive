import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-basic-info',
  templateUrl: './edit-basic-info.component.html',
  styleUrls: ['./edit-basic-info.component.css'],
})
export class EditBasicInfoComponent {
  field: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) _data: string) {
    this.field = _data;
  }

  cancel(){}


  onSubmit(){}
}
