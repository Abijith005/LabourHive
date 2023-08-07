import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { HelperService } from 'src/app/services/commonServices/helper.service';


@Component({
  selector: 'labourHive-admin-login',
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
    private _service:AdminService,
    private _router:Router,
    private _helper:HelperService) {

  }


  get formControls() {
    return this.loginForm.controls
  }

  onSubmit() {
    this.isSubmitted = true
    if (this.loginForm.valid) {
      this._service.adminLogin(this.loginForm.value).subscribe((res)=>{
        let message='Invalid credentilas'
        if (res.success) {        
          this._router.navigate(['/admin/dashboard'])
          
          message='Do your actions'

        }
        this._helper.showToaster( message,res.success)   

       
      })
    }



  }

}
