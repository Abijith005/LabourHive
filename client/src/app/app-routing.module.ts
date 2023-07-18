import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './components/userComponents/user-home/user-home.component';
import { UserLoginComponent } from './components/userComponents/user-login/user-login.component';
import { UserRegisterComponent } from './components/userComponents/user-register/user-register.component';
import { AdminLoginComponent } from './components/adminComponents/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/adminComponents/admin-dashboard/admin-dashboard.component';
import { authLogin } from './guards/userAuth.guard';

const routes: Routes = [{path:'',component:UserHomeComponent},
{path:'login',component:UserLoginComponent,canActivate:[authLogin]},
{path:'register',component:UserRegisterComponent,canActivate:[authLogin]},

{path:'admin',
children:[{path:'',component:AdminLoginComponent},
{path:'dashboard',component:AdminDashboardComponent}
]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
