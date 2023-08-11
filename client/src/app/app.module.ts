import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/userComponents/user-login/user-login.component';
import { UserRegisterComponent } from './components/userComponents/user-register/user-register.component';
import { UserHomeComponent } from './components/userComponents/user-home/user-home.component';
import { AdminLoginComponent } from './components/adminComponents/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/adminComponents/admin-dashboard/admin-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { StoreModule } from '@ngrx/store';
import { RegisterOtpComponent } from './components/userComponents/register-otp/register-otp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxAwesomePopupModule, ToastNotificationConfigModule } from '@costlydeveloper/ngx-awesome-popup';
import { ForgotPasswordComponent } from './components/userComponents/forgot-password/forgot-password.component';
import { ForgotPasswordOtpComponent } from './components/userComponents/forgot-password-otp/forgot-password-otp.component';
import { ChangePasswordComponent } from './components/userComponents/change-password/change-password.component';
import { CookieService } from 'ngx-cookie-service';
import { UserInterceptorInterceptor } from './interceptor/user-interceptor.interceptor';
import { NavBarComponent } from './components/userComponents/nav-bar/nav-bar.component';
import { FooterComponent } from './components/userComponents/footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { AdminNavBarComponent } from './components/adminComponents/admin-nav-bar/admin-nav-bar.component';
import { UserMangementComponent } from './components/adminComponents/user-mangement/user-mangement.component';
import {MatCardModule} from '@angular/material/card';
import { CategoryMangementComponent } from './components/adminComponents/category-mangement/category-mangement.component';
import { WorkMangementComponent } from './components/adminComponents/work-mangement/work-mangement.component';
import { WalletMangementComponent } from './components/adminComponents/wallet-mangement/wallet-mangement.component';
import { adminDataReducer } from './store/admin.reducer';
import { authReducer } from './store/user.reducer';
import { AddCategoryComponent } from './components/adminComponents/add-category/add-category.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EditCategoryComponent } from './components/adminComponents/edit-category/edit-category.component';
import { JobProfileComponent } from './components/userComponents/job-profile/job-profile.component';
import { CreatejobProfileComponent } from './components/userComponents/createjob-profile/createjob-profile.component';
import { ViewJobsComponent } from './components/userComponents/view-jobs/view-jobs.component';
import { LoadingComponent } from './components/commonComponents/loading/loading.component';
import { EditJobProfileComponent } from './components/userComponents/edit-job-profile/edit-job-profile.component';
import { ViewLaboursComponent } from './components/userComponents/view-labours/view-labours.component';
import { StarRatingPipe } from './pipes/userPipes/star-rating.pipe';
import { ViewJobProfileComponent } from './components/userComponents/view-job-profile/view-job-profile.component';
import { PaymentDetailsComponent } from './components/userComponents/payment-details/payment-details.component';
import { ChatComponent } from './components/userComponents/chat/chat.component';
import { MapboxService } from './services/commonServices/mapbox.service';
import { MyJobsComponent } from './components/userComponents/my-jobs/my-jobs.component';
import { PostJobComponent } from './components/userComponents/post-job/post-job.component';
@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserHomeComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    RegisterOtpComponent,
    ForgotPasswordComponent,
    ForgotPasswordOtpComponent,
    ChangePasswordComponent,
    NavBarComponent,
    FooterComponent,
    AdminNavBarComponent,
    UserMangementComponent,
    CategoryMangementComponent,
    WorkMangementComponent,
    WalletMangementComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    JobProfileComponent,
    CreatejobProfileComponent,
    ViewJobsComponent,
    LoadingComponent,
    EditJobProfileComponent,
    ViewLaboursComponent,
    StarRatingPipe,
    ViewJobProfileComponent,
    PaymentDetailsComponent,
    ChatComponent,
    MyJobsComponent,
    PostJobComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({user:authReducer,adminData: adminDataReducer}),
    NgxAwesomePopupModule.forRoot(),
    ToastNotificationConfigModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule

  
  ],
  providers: [
    CookieService,
    {provide:HTTP_INTERCEPTORS,useClass:UserInterceptorInterceptor,multi:true},
    MapboxService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
