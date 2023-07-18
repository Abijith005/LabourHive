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
import { authReducer } from './state/user.reducer';
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
import { AdminNavBarComponent } from './components/adminComponents/admin-nav-bar/admin-nav-bar.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,StoreModule.forRoot({auth:authReducer}),
    NgxAwesomePopupModule.forRoot(),
    ToastNotificationConfigModule.forRoot(),
    MatButtonModule,
    MatIconModule,MatInputModule,MatFormFieldModule

  
  ],
  providers: [
    CookieService,
    {provide:HTTP_INTERCEPTORS,useClass:UserInterceptorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
