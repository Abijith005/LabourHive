import { NgModule } from '@angular/core';
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

const routes: Routes = [{ path: '', component: UserHomeComponent },
{ path: 'login', component: UserLoginComponent, canActivate: [authLogin] },
{ path: 'register', component: UserRegisterComponent, canActivate: [authLogin] },


{ path: 'adminLogin', component: AdminLoginComponent },
{
  path: 'admin', component: AdminNavBarComponent,
  children: [{ path: 'dashboard', component: AdminDashboardComponent },
  { path: 'userManagement', component: UserMangementComponent },
  {path:'categoryManagement',component:CategoryMangementComponent},
  {path:'workManagement',component:WorkMangementComponent},
  {path:'walletManagement',component:WalletMangementComponent}
  ]
}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
