import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  isSubmitted = false
  forgotForm: FormGroup = new FormGroup({})
  generateOtp: boolean = false

  constructor(private fb: FormBuilder,
    private service: UserService,
    private helper:HelperService) {

  }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  get formControls() {
    return this.forgotForm.controls
  }

  onSubmit() {
    this.isSubmitted = true
    if (this.forgotForm.valid) {
      const { email } = this.forgotForm.value
      this.service.forgotPassoword(email).subscribe((res) => {
        console.log(res,'otppres');
        
        if (res.success) {
          this.generateOtp = true
        }
        else {

          const message=res.message
          this.helper.showToaster(message,res.success)

        }

      })


    }

  }





}
