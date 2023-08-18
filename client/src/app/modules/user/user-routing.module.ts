import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { userAuthRoutingModule } from "./user-auth/user-auth-routing.module";
import { UserHomeComponent } from "./user-home/user-home.component";
import { userActionRoutingModule } from "./user-action/user-action-routing.module";

const userRoutes:Routes=[
   {path:'',component:UserHomeComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(userRoutes),userAuthRoutingModule,userActionRoutingModule],

    exports: [RouterModule],
})
export class userRoutingModule{}