import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNavBarComponent } from './admin-nav-bar/admin-nav-bar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserMangementComponent } from './user-mangement/user-mangement.component';
import { CategoryMangementComponent } from './category-mangement/category-mangement.component';
import { WorkMangementComponent } from './work-mangement/work-mangement.component';
import { WalletMangementComponent } from './wallet-mangement/wallet-mangement.component';
import { HireManagementComponent } from './hire-management/hire-management.component';
import { ComplaintManagementComponent } from './complaint-management/complaint-management.component';
import { adminAuthGuard } from 'src/app/guards/admin-auth.guard';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminNavBarComponent,
    canActivateChild:[adminAuthGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'userManagement', component: UserMangementComponent },
      { path: 'categoryManagement', component: CategoryMangementComponent },
      { path: 'workManagement', component: WorkMangementComponent },
      { path: 'walletManagement', component: WalletMangementComponent },
      { path: 'hireManagement', component: HireManagementComponent },
      { path: 'complaintManagement',component:ComplaintManagementComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class adminRoutingModule {}
