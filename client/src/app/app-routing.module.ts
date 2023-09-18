import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './modules/admin/admin-login/admin-login.component';
import { ErrorComponent } from './modules/shared/error/error.component';

const routes: Routes = [
  // Lazy-loaded modules
  {
    path: '',
    loadChildren: () =>
      import('./modules/user-module/user.module').then(
        (module) => module.UserModule
      ),
  },


  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then(
        (module) => module.AdminModule
      ),
  },

  //admin paths

  { path: 'adminLogin', component: AdminLoginComponent },

  {
    path:'**',
    component:ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
