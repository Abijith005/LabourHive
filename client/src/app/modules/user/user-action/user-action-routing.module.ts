import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { JobProfileComponent } from './job-profile/job-profile.component';
import { CreatejobProfileComponent } from './createjob-profile/createjob-profile.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';
import { ViewLaboursComponent } from './view-labours/view-labours.component';
import { ViewJobProfileComponent } from './view-job-profile/view-job-profile.component';
import { ChatComponent } from './chat/chat.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { userAuth } from 'src/app/guards/userAuth.guard';
import { PostedJobsComponent } from './posted-jobs/posted-jobs.component';
import { EngagedJobsComponent } from './engaged-jobs/engaged-jobs.component';

const userActionRoutes: Routes = [
  {
    path: '',
    component: NavBarComponent,
    children: [
      { path: '', component: UserHomeComponent },
      {
        path: 'jobProfile',
        component: JobProfileComponent,
        canActivate: [userAuth],
      },
      {
        path: 'createJobProfile/:categories',
        component: CreatejobProfileComponent,
      },
      { path: 'viewJobs', component: ViewJobsComponent },
      { path: 'viewLabours/:category', component: ViewLaboursComponent },
      {
        path: 'viewJobProfile/:labour_id',
        component: ViewJobProfileComponent,
        children: [{ path: 'chat', component: ChatComponent }],
      },
      { path: 'chat', component: ChatComponent },
      {
        path: 'myJobs',
        component: MyJobsComponent,
        canActivate: [userAuth],
        children: [
          { path: '', redirectTo: 'postedJobs', pathMatch: 'full' },
          { path: 'postedJobs', component: PostedJobsComponent },
          { path: 'engagedJobs', component: EngagedJobsComponent },
        ],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(userActionRoutes)],
  exports: [RouterModule],
})
export class userActionRoutingModule {}
