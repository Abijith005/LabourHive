import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/modules/user-module/components/footer/footer.component';
import { userRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreatejobProfileComponent } from './components/createjob-profile/createjob-profile.component';
import { EditJobProfileComponent } from './components/edit-job-profile/edit-job-profile.component';
import { EngagedJobsComponent } from './components/engaged-jobs/engaged-jobs.component';
import { StarRatingPipe } from 'src/app/pipes/userPipes/star-rating.pipe';
import { CustomDatePipe } from 'src/app/pipes/userPipes/custom-date.pipe';
import { ViewLaboursComponent } from './components/view-labours/view-labours.component';
import { ViewJobProfileComponent } from './components/view-job-profile/view-job-profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { ViewJobsComponent } from './components/view-jobs/view-jobs.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { LoadingComponent } from 'src/app/components/commonComponents/loading/loading.component';
import { ViewApplicantsComponent } from './components/view-applicants/view-applicants.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import {  MatTooltipModule } from '@angular/material/tooltip';
import { JobProfileComponent } from './components/job-profile/job-profile.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { PostedJobsComponent } from './components/posted-jobs/posted-jobs.component';
import { SingleJobComponent } from './components/single-job/single-job.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    UserHomeComponent,
    NavBarComponent,
    FooterComponent,
    CreatejobProfileComponent,
    EditJobProfileComponent,
    EngagedJobsComponent,
    JobProfileComponent,
    ViewLaboursComponent,
    ViewJobProfileComponent,
    ChatComponent,
    ViewJobsComponent,
    PaymentDetailsComponent,
    MyJobsComponent,
    PostJobComponent,
    PostedJobsComponent,
    SingleJobComponent,
    LoadingComponent,
    ViewApplicantsComponent,
    EditJobComponent
  ],
  imports: [
    CommonModule,
    userRoutingModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
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
    MatTooltipModule,SharedModule
  ],
})
export class UserModule {}
