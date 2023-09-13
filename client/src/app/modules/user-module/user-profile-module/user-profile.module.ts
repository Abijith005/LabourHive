import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileLandingComponent } from './user-profile-landing/user-profile-landing.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { userProfileRoutingModule } from './user-profile-routing.module';
import { ReviewsComponent } from './reviews/reviews.component';
import { WalletComponent } from './wallet/wallet.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { HistoryComponent } from './history/history.component';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../../shared/shared.module';
import { RatingComponent } from './rating/rating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobInfoComponent } from './job-info/job-info.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { EditBasicInfoComponent } from './edit-basic-info/edit-basic-info.component';



@NgModule({
  declarations: [
    UserProfileLandingComponent,
    BasicInfoComponent,
    ReviewsComponent,
    WalletComponent,
    SchedulesComponent,
    HistoryComponent,
    RatingComponent,
    JobInfoComponent,
    WithdrawComponent,
    EditBasicInfoComponent,
    
  ],
  imports: [
    CommonModule,
    userProfileRoutingModule,
    MatProgressBarModule,
    MatTooltipModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule

  
  ]
})
export class UserProfileModule { }
