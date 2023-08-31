import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipe } from 'src/app/pipes/userPipes/custom-date.pipe';
import { StarRatingPipe } from 'src/app/pipes/userPipes/star-rating.pipe';
import { DateAndDayPipe } from 'src/app/pipes/userPipes/date-and-day.pipe';
import { LoadingComponent } from 'src/app/components/commonComponents/loading/loading.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    CustomDatePipe,
    StarRatingPipe,
    DateAndDayPipe,
    LoadingComponent,
  ],
  imports: [CommonModule ,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTooltipModule,],
  exports: [CustomDatePipe, StarRatingPipe, DateAndDayPipe, LoadingComponent],
})
export class SharedModule {}
