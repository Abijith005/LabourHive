import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserLoginComponent } from "./user-login/user-login.component";
import { guestAuthGuard } from "src/app/guards/guest-auth.guard";
import { UserRegisterComponent } from "./user-register/user-register.component";

const userAuthRoutes:Routes=[
    {
        path: 'login',
        component: UserLoginComponent,
        canActivate: [guestAuthGuard],
      },
      {
        path: 'register',
        component: UserRegisterComponent,
        canActivate: [guestAuthGuard],
      },
]

@NgModule({
    imports:[RouterModule.forChild(userAuthRoutes)],
    exports:[RouterModule]
})
export class userAuthRoutingModule{}