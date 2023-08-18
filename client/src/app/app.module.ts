import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './components/adminComponents/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/adminComponents/admin-dashboard/admin-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxAwesomePopupModule, ToastNotificationConfigModule } from '@costlydeveloper/ngx-awesome-popup';
import { CookieService } from 'ngx-cookie-service';
import { UserInterceptorInterceptor } from './interceptor/user-interceptor.interceptor';
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
import { LoadingComponent } from './components/commonComponents/loading/loading.component';
import { MapboxService } from './services/commonServices/mapbox.service';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AppInitializerService } from './services/commonServices/app-initializer.service';
import { UserModule } from './modules/user/user.module';



@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminNavBarComponent,
    UserMangementComponent,
    CategoryMangementComponent,
    WorkMangementComponent,
    WalletMangementComponent,
    AddCategoryComponent,
    EditCategoryComponent,

    LoadingComponent,
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
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    UserModule
   
  ],
  providers: [
    CookieService,
    {provide:HTTP_INTERCEPTORS,useClass:UserInterceptorInterceptor,multi:true},
    MapboxService,
    AppInitializerService,
    {
      provide: APP_INITIALIZER,
      useFactory: (initializer: AppInitializerService) => () => initializer.initializeApp(),
      multi: true,
      deps: [AppInitializerService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
