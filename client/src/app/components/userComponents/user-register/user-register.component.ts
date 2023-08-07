import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/commonServices/helper.service';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'labourHive-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {



  isSubmitted: boolean = false
  otp: boolean = false
  formHeading = 'USER REGISTER'
  registerForm: FormGroup = new FormGroup({})
  registerData: any
  isPasswordVisible: boolean = false
  isConfirmPasswordVisible: boolean = false


  constructor(private services: UserService,
    private fb: FormBuilder,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.pattern('^[\\S]{3,}$')]],
      confirmPassword: ['', [Validators.required]]
    })

  }


  get formControls() {
    return this.registerForm.controls
  }

  passwordVisibility(field: string) {
    field == 'password' ? this.isPasswordVisible = !this.isPasswordVisible : this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible

  }

  onSubmit() {
    this.isSubmitted = true
    if (this.registerForm.valid) {
      this.registerData = this.registerForm.value
      this.services.userRegister(this.registerData).subscribe(res => {
        if (res.success) {
          this.otp = true
          this.formHeading = 'VERIFY OTP'
        }
        else {

          const message = res.message
          this.helper.showToaster(message, res.success)

        }
      })

    }
  }















}
