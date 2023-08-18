import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userRoutingModule } from '../user-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from 'src/app/components/commonComponents/loading/loading.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreatejobProfileComponent } from './createjob-profile/createjob-profile.component';
import { EditJobProfileComponent } from './edit-job-profile/edit-job-profile.component';
import { EngagedJobsComponent } from './engaged-jobs/engaged-jobs.component';
import { JobProfileComponent } from './job-profile/job-profile.component';
import { StarRatingPipe } from 'src/app/pipes/userPipes/star-rating.pipe';
import { CustomDatePipe } from 'src/app/pipes/userPipes/custom-date.pipe';
import { ViewLaboursComponent } from './view-labours/view-labours.component';
import { ViewJobProfileComponent } from './view-job-profile/view-job-profile.component';
import { ChatComponent } from './chat/chat.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { PostJobComponent } from './post-job/post-job.component';
import { PostedJobsComponent } from './posted-jobs/posted-jobs.component';
import { SingleJobComponent } from './single-job/single-job.component';

@NgModule({
  declarations: [
    CreatejobProfileComponent,
    EditJobProfileComponent,
    EngagedJobsComponent,
    JobProfileComponent,
    StarRatingPipe,
    CustomDatePipe,
    ViewLaboursComponent,
    ViewJobProfileComponent,
    ChatComponent,
    ViewJobsComponent,
    PaymentDetailsComponent,
    MyJobsComponent,
    PostJobComponent,
    PostedJobsComponent,
    SingleJobComponent

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    userRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule, 
    MatProgressSpinnerModule,
  ],
})
export class UserActionModule {}
