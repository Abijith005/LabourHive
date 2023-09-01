import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavBarComponent } from 'src/app/components/adminComponents/admin-nav-bar/admin-nav-bar.component';
import { AdminDashboardComponent } from 'src/app/components/adminComponents/admin-dashboard/admin-dashboard.component';
import { CategoryMangementComponent } from 'src/app/components/adminComponents/category-mangement/category-mangement.component';
import { UserMangementComponent } from 'src/app/components/adminComponents/user-mangement/user-mangement.component';
import { WorkMangementComponent } from 'src/app/components/adminComponents/work-mangement/work-mangement.component';
import { WalletMangementComponent } from 'src/app/components/adminComponents/wallet-mangement/wallet-mangement.component';
import { AddCategoryComponent } from 'src/app/components/adminComponents/add-category/add-category.component';
import { EditCategoryComponent } from 'src/app/components/adminComponents/edit-category/edit-category.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { adminRoutingModule } from './admin-routing-module';



@NgModule({
  declarations: [
    AdminNavBarComponent,
    AdminDashboardComponent,
    CategoryMangementComponent,
    UserMangementComponent,
    WorkMangementComponent,
    WalletMangementComponent,
    AddCategoryComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    adminRoutingModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    SharedModule
  ]
})
export class AdminModule { }
