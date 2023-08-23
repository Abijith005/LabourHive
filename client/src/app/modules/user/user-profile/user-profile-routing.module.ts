import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { UserProfileLandingComponent } from './user-proile-landing/user-profile-landing.component';

const userProfileRoutes: Routes = [
  {
    path: '',
    component: UserProfileLandingComponent,
    children: [
      { path: '', redirectTo: 'basicInfo', pathMatch: 'full' },
      { path: 'basicInfo', component: BasicInfoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userProfileRoutes)],
  exports: [RouterModule],
})
export class userProfileRoutingModule {}
