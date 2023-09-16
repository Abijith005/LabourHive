import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { userAuth } from 'src/app/guards/userAuth.guard';
import { CreatejobProfileComponent } from './components/createjob-profile/createjob-profile.component';
import { ViewJobsComponent } from './components/view-jobs/view-jobs.component';
import { ViewLaboursComponent } from './components/view-labours/view-labours.component';
import { ViewJobProfileComponent } from './components/view-job-profile/view-job-profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { EngagedJobsComponent } from './components/engaged-jobs/engaged-jobs.component';
import { guestAuthGuard } from 'src/app/guards/guest-auth.guard';
import { JobProfileComponent } from './components/job-profile/job-profile.component';
import { PostedJobsComponent } from './components/posted-jobs/posted-jobs.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';

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
          { path: 'postedJobs', component: PostedJobsComponent},
          { path: 'engagedJobs', component: EngagedJobsComponent },
        ],
      },
      {
        path: 'userProfile',
        canActivateChild: [userAuth],
        loadChildren: () =>
          import('./user-profile-module/user-profile.module').then( 
            (module) => module.UserProfileModule
          ),
      },
    ],
  },

  {
    path: 'auth',               
    canActivateChild: [guestAuthGuard],
    loadChildren: () =>
      import('./user-auth-module/user-auth.module').then(
        (module) => module.UserAuthModule
      ),
  },

];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],

  exports: [RouterModule],
})
export class userRoutingModule {}
