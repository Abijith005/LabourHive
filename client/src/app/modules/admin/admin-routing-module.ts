import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "src/app/components/adminComponents/admin-dashboard/admin-dashboard.component";
import { AdminNavBarComponent } from "src/app/components/adminComponents/admin-nav-bar/admin-nav-bar.component";
import { CategoryMangementComponent } from "src/app/components/adminComponents/category-mangement/category-mangement.component";
import { UserMangementComponent } from "src/app/components/adminComponents/user-mangement/user-mangement.component";
import { WalletMangementComponent } from "src/app/components/adminComponents/wallet-mangement/wallet-mangement.component";
import { WorkMangementComponent } from "src/app/components/adminComponents/work-mangement/work-mangement.component";

const adminRoutes:Routes=[
{
  path: 'admin',
  component: AdminNavBarComponent,
  children: [
    { path: '', component: AdminDashboardComponent},
    { path: 'userManagement', component: UserMangementComponent},
    { path: 'categoryManagement', component: CategoryMangementComponent },
    { path: 'workManagement', component: WorkMangementComponent },
    { path: 'walletManagement', component: WalletMangementComponent },
  ],
},]

@NgModule({
imports:[RouterModule.forChild(adminRoutes)],
exports:[RouterModule]

})

export class adminRoutingModule{}