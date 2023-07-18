import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { Store } from '@ngrx/store';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { login } from 'src/app/state/user.actions';
import { AppState } from 'src/app/state/user.state';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false
  forgotPassword: boolean = false
  heading: string = 'USER LOGIN'
  hide:boolean=true

  constructor(private service: UserService,
    private router: Router,
    private fb: FormBuilder,
    private helper: HelperService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }

  get formControls() {
    return this.loginForm.controls
  }

  onSubmit() {
    this.isSubmitted = true
    if (this.loginForm.valid) {
      const formData = this.loginForm.value
      this.service.userLogin(formData).subscribe((res: any) => {
        if (res.success) {          
          this.store.dispatch(login({ userDatas: res.userData }))
          localStorage.setItem('userLoggedIn', res.token)
          const title = 'Login Success!!'
          const message = res.message
          const layout = DialogLayoutDisplay.SUCCESS
          this.router.navigate([''])

          this.helper.showToaster(title, message, layout)

        }
        else {

          const title = 'Failed!!'
          const message = res.message
          const layout = DialogLayoutDisplay.DANGER
          this.helper.showToaster(title, message, layout)

        }

      })
    }



  }

  resetPassword() {
    this.forgotPassword = true
  }

  togglePasswordVisibility(){
   this.hide=this.hide?false:true
  }







}
