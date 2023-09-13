import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import {MatCardModule} from '@angular/material/card';
import { adminDataReducer } from './store/admin.reducer';
import { authReducer } from './store/user.reducer';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MapboxService } from './services/commonServices/mapbox.service';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AppInitializerService } from './services/commonServices/app-initializer.service';
import { DatePipe } from '@angular/common';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './pipes/user-module/user.module';
import { AdminLoginComponent } from './modules/admin/admin-login/admin-login.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UserModule,
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
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
