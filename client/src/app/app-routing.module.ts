import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/adminComponents/admin-login/admin-login.component';
import { AdminNavBarComponent } from './components/adminComponents/admin-nav-bar/admin-nav-bar.component';
import { UserMangementComponent } from './components/adminComponents/user-mangement/user-mangement.component';
import { AdminDashboardComponent } from './components/adminComponents/admin-dashboard/admin-dashboard.component';
import { CategoryMangementComponent } from './components/adminComponents/category-mangement/category-mangement.component';
import { WorkMangementComponent } from './components/adminComponents/work-mangement/work-mangement.component';
import { WalletMangementComponent } from './components/adminComponents/wallet-mangement/wallet-mangement.component';



const routes: Routes =


[
      // Lazy-loaded modules
  {
    path: '',
    loadChildren: () => import('./modules/user-module/user.module').then(module => module.UserModule),
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
