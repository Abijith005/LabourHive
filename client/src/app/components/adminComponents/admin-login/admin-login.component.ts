import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppearanceAnimation, DialogLayoutDisplay, DisappearanceAnimation, ToastNotificationInitializer, ToastPositionEnum, ToastProgressBarEnum, ToastUserViewTypeEnum } from '@costlydeveloper/ngx-awesome-popup';
import { AdminService } from 'src/app/services/admin.service';
import { HelperService } from 'src/app/services/helper.service';

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
    private router:Router,
    private helper:HelperService) {

  }


  get formControls() {
    return this.loginForm.controls
  }

  onSubmit() {
    this.isSubmitted = true
    if (this.loginForm.valid) {
      this.service.adminLogin(this.loginForm.value).subscribe((res)=>{
        let message='Invalid credentilas'
        if (res.success) {        
          this.router.navigate(['/admin/dashboard'])
          
          message='Do your actions'

        }
        this.helper.showToaster( message,res.success)   

       
      })
    }



  }

}
