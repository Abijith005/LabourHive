import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/modules/user/footer/footer.component';
import { UserAuthModule } from './user-auth/user-auth.module';
import { userRoutingModule } from './user-routing.module';
import { UserActionModule } from './user-action/user-action.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [UserHomeComponent, NavBarComponent, FooterComponent],
  imports: [CommonModule, UserAuthModule, userRoutingModule, UserActionModule],
})
export class UserModule {}
