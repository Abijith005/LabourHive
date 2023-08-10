import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { HelperService } from 'src/app/services/commonServices/helper.service';
import { UserService } from 'src/app/services/userServices/user.service';
import { login } from 'src/app/store/user.actions';
import { userDataState } from 'src/app/store/user.state';

@Component({
  selector: 'labourHive-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit,OnDestroy {
  //variable declarations

  loginForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  forgotPassword: boolean = false;
  heading: string = 'USER LOGIN';
  isPasswordVisible: boolean = false;

  private _unsubscribe$=new Subject<void>()

  constructor(
    private service: UserService,
    private router: Router,
    private fb: FormBuilder,
    private helper: HelperService,
    private store: Store<userDataState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.service.userLogin(formData).pipe(takeUntil(this._unsubscribe$)).subscribe((res) => {
        if (res.success) {
          const userData = {
            _id: res._id,
            name: res.name,
            email: res.email,
            password: res.password ? res.password : '',
            profilePicture: res.profilePicture ? res.profilePicture : '',
            blockStatus: res.blockStatus,
            googleLogin: res.googleLogin,
            mobileNumber: res.mobileNumber ? res.mobileNumber : '',
          };

          this.store.dispatch(login({ userDatas: userData }));
          localStorage.setItem('userLoggedIn', res.token!);
          const message = res.message;
          this.router.navigate(['/']);

          this.helper.showToaster(message, res.success);
        } else {
          const message = res.message;
          this.helper.showToaster(message, res.success);
        }
      });
    }
  }

  resetPassword() {
    this.forgotPassword = true;
  }

  passwordVisibility() {
    this.isPasswordVisible = this.isPasswordVisible ? false : true;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }
}
