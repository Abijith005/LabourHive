import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileLandingComponent } from './user-proile-landing/user-profile-landing.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { userProfileRoutingModule } from './user-profile-routing.module';



@NgModule({
  declarations: [
    UserProfileLandingComponent,
    BasicInfoComponent
  ],
  imports: [
    CommonModule,
    userProfileRoutingModule
  ]
})
export class UserProfileModule { }
