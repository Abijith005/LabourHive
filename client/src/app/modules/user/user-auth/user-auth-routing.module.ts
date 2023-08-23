import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const userAuthRoutes: Routes = [
    {
      path:'',redirectTo:'login',pathMatch:'full'
    },
    {
      path: 'login',
      component: UserLoginComponent,
    },
    {
      path: 'register',
      component: UserRegisterComponent,
    },

    ]


@NgModule({
  imports: [RouterModule.forChild(userAuthRoutes)],
  exports: [RouterModule],
})
export class userAuthRoutingModule {}
