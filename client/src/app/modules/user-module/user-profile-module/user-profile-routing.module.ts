import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { UserProfileLandingComponent } from './user-profile-landing/user-profile-landing.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { WalletComponent } from './wallet/wallet.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { HistoryComponent } from './history/history.component';

const userProfileRoutes: Routes = [
  {
    path: '',
    component: UserProfileLandingComponent,
    children: [
      { path: '', redirectTo: 'basicInfo', pathMatch: 'full' },
      { path: 'basicInfo', component: BasicInfoComponent },
      {path:'reviews',component:ReviewsComponent},
      {path:'wallet',component:WalletComponent},
      {path:'schedules',component:SchedulesComponent},
      {path:'history',component:HistoryComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userProfileRoutes)],
  exports: [RouterModule],
})
export class userProfileRoutingModule {}
