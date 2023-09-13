import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { HelperService } from 'src/app/services/commonServices/helper.service';
import { UserService } from 'src/app/modules/user-module/userServices/user.service';

@Component({
  selector: 'labourHive-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit,OnDestroy {
  // variable declarations

  isSubmitted = false;
  forgotForm: FormGroup = new FormGroup({});
  generateOtp: boolean = false;

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private helper: HelperService
  ) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get formControls() {
    return this.forgotForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.forgotForm.valid) {
      const { email } = this.forgotForm.value;
      this.service.forgotPassoword(email).pipe(takeUntil(this._unsubscribe$)).subscribe((res) => {
        console.log(res, 'otppres');

        if (res.success) {
          this.generateOtp = true;
        } else {
          const message = res.message;
          this.helper.showToaster(message, res.success);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }
}
