import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppearanceAnimation, DialogLayoutDisplay, DisappearanceAnimation, ToastNotificationInitializer, ToastPositionEnum, ToastProgressBarEnum, ToastUserViewTypeEnum } from '@costlydeveloper/ngx-awesome-popup';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  isSubmitted = false
  loginForm: FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  constructor(private fb: FormBuilder,
    private service:AdminService,
    private router:Router) {

  }


  get formControls() {
    return this.loginForm.controls
  }

  onSubmit() {
    this.isSubmitted = true
    if (this.loginForm.valid) {
      this.service.adminLogin(this.loginForm.value).subscribe((res)=>{
        if (res.success) {
          
          this.router.navigate(['admin/dashboard'])
          const newToastNotification = new ToastNotificationInitializer();

        newToastNotification.setTitle(res.message);
        newToastNotification.setMessage('Do your actions');

        // Choose layout color type
        newToastNotification.setConfig({
        autoCloseDelay: 1800, // optional
        textPosition: 'center', // optional
        layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
        progressBar: ToastProgressBarEnum.INCREASE, // INCREASE | DECREASE | NONE
        toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
        animationIn: AppearanceAnimation.ELASTIC, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
        animationOut: DisappearanceAnimation.ZOOM_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
         // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
        toastPosition: ToastPositionEnum.TOP_CENTER,
        allowHtmlMessage: true,
        });

        // Simply open the popup
        newToastNotification.openToastNotification$(); 
          
        }
        else{

          const newToastNotification = new ToastNotificationInitializer();

        newToastNotification.setTitle('Login Failed');
        newToastNotification.setMessage(res.message);

        // Choose layout color type
        newToastNotification.setConfig({
        autoCloseDelay: 1800, // optional
        textPosition: 'center', // optional
        layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
        progressBar: ToastProgressBarEnum.INCREASE, // INCREASE | DECREASE | NONE
        toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
        animationIn: AppearanceAnimation.ELASTIC, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
        animationOut: DisappearanceAnimation.ZOOM_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
         // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
        toastPosition: ToastPositionEnum.TOP_CENTER,
        allowHtmlMessage: true,
        });

        // Simply open the popup
        newToastNotification.openToastNotification$();
        }
      })
    }



  }

}
