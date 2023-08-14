import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './components/userComponents/user-home/user-home.component';
import { UserLoginComponent } from './components/userComponents/user-login/user-login.component';
import { UserRegisterComponent } from './components/userComponents/user-register/user-register.component';
import { AdminLoginComponent } from './components/adminComponents/admin-login/admin-login.component';
import { authLogin } from './guards/userAuth.guard';
import { AdminNavBarComponent } from './components/adminComponents/admin-nav-bar/admin-nav-bar.component';
import { UserMangementComponent } from './components/adminComponents/user-mangement/user-mangement.component';
import { AdminDashboardComponent } from './components/adminComponents/admin-dashboard/admin-dashboard.component';
import { CategoryMangementComponent } from './components/adminComponents/category-mangement/category-mangement.component';
import { WorkMangementComponent } from './components/adminComponents/work-mangement/work-mangement.component';
import { WalletMangementComponent } from './components/adminComponents/wallet-mangement/wallet-mangement.component';
import { JobProfileComponent } from './components/userComponents/job-profile/job-profile.component';
import { NavBarComponent } from './components/userComponents/nav-bar/nav-bar.component';
import { CreatejobProfileComponent } from './components/userComponents/createjob-profile/createjob-profile.component';
import { ViewJobsComponent } from './components/userComponents/view-jobs/view-jobs.component';
import { ViewLaboursComponent } from './components/userComponents/view-labours/view-labours.component';
import { ViewJobProfileComponent } from './components/userComponents/view-job-profile/view-job-profile.component';
import { ChatComponent } from './components/userComponents/chat/chat.component';
import { MyJobsComponent } from './components/userComponents/my-jobs/my-jobs.component';
import { PostedJobsComponent } from './components/userComponents/posted-jobs/posted-jobs.component';
import { EngagedJobsComponent } from './components/userComponents/engaged-jobs/engaged-jobs.component';

const routes: Routes =
  //user paths

  [
    {
      path: '',
      component: NavBarComponent,
      children: [
        { path: '', component: UserHomeComponent },
        { path: 'jobProfile', component: JobProfileComponent },
        {
          path: 'createJobProfile/:categories',
          component: CreatejobProfileComponent,
        },
        { path: 'viewJobs', component: ViewJobsComponent },
        { path: 'viewLabours/:category', component: ViewLaboursComponent },
        {
          path: 'viewJobProfile/:labour_id',
          component: ViewJobProfileComponent,children:[
            {path:'chat',component:ChatComponent}
          ],
        },
        { path: 'chat', component: ChatComponent },
        {path:'myJobs',component:MyJobsComponent,children:[
          {path:'',redirectTo:'postedJobs',pathMatch:'full'},
          {path:'postedJobs',component:PostedJobsComponent},
          {path:'engagedJobs',component:EngagedJobsComponent}
        ]}
      ],
    },

    { path: 'login', component: UserLoginComponent, canActivate: [authLogin] },
    {
      path: 'register',
      component: UserRegisterComponent,
      canActivate: [authLogin],
    },

    //admin paths

    { path: 'adminLogin', component: AdminLoginComponent },
    {
      path: 'admin',
      component: AdminNavBarComponent,
      children: [
        { path: '', component: AdminDashboardComponent },
        { path: 'userManagement', component: UserMangementComponent },
        { path: 'categoryManagement', component: CategoryMangementComponent },
        { path: 'workManagement', component: WorkMangementComponent },
        { path: 'walletManagement', component: WalletMangementComponent },
      ],
    },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
