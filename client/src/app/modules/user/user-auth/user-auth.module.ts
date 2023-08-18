import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { RegisterOtpComponent } from './register-otp/register-otp.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordOtpComponent } from './forgot-password-otp/forgot-password-otp.component';
import { userAuthRoutingModule } from './user-auth-routing.module';

@NgModule({
  declarations: [
    UserRegisterComponent,
    UserLoginComponent,
    RegisterOtpComponent,
    ForgotPasswordComponent,
    ForgotPasswordOtpComponent,
    ChangePasswordComponent,
  ],

  exports: [
    UserRegisterComponent,
    UserLoginComponent,
    RegisterOtpComponent,
    ForgotPasswordComponent,
    ForgotPasswordOtpComponent,
    ChangePasswordComponent,
  ],

  imports: [CommonModule, FormsModule, ReactiveFormsModule, userAuthRoutingModule],
})
export class UserAuthModule {}
