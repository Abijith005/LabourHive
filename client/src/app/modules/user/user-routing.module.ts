import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { JobProfileComponent } from './job-profile/job-profile.component';
import { userAuth } from 'src/app/guards/userAuth.guard';
import { CreatejobProfileComponent } from './createjob-profile/createjob-profile.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';
import { ViewLaboursComponent } from './view-labours/view-labours.component';
import { ViewJobProfileComponent } from './view-job-profile/view-job-profile.component';
import { ChatComponent } from './chat/chat.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { PostedJobsComponent } from './posted-jobs/posted-jobs.component';
import { EngagedJobsComponent } from './engaged-jobs/engaged-jobs.component';
import { guestAuthGuard } from 'src/app/guards/guest-auth.guard';
import { UserProfileLandingComponent } from './user-profile/user-proile-landing/user-profile-landing.component';

const userRoutes: Routes = [
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
      {
        path: 'userProfile',
        canActivateChild: [userAuth],
        loadChildren: () =>
          import('./user-profile/user-profile.module').then( 
            (module) => module.UserProfileModule
          ),
      },
    ],
  },

  {
    path: 'auth',               
    canActivateChild: [guestAuthGuard],
    loadChildren: () =>
      import('./user-auth/user-auth.module').then(
        (module) => module.UserAuthModule
      ),
  },

];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],

  exports: [RouterModule],
})
export class userRoutingModule {}
