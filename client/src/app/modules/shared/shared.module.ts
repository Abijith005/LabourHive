import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipe } from 'src/app/pipes/userPipes/custom-date.pipe';
import { StarRatingPipe } from 'src/app/pipes/userPipes/star-rating.pipe';
import { SwalService } from 'src/app/services/commonServices/swal.service';



@NgModule({
  declarations: [CustomDatePipe,StarRatingPipe],
  imports: [
    CommonModule,
  ],
 exports:[
  CustomDatePipe,
  StarRatingPipe,
 ]
})
export class SharedModule { }
