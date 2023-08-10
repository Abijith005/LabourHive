import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { HelperService } from 'src/app/services/commonServices/helper.service';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'labourHive-forgot-password-otp',
  templateUrl: './forgot-password-otp.component.html',
  styleUrls: ['./forgot-password-otp.component.css'],
})
export class ForgotPasswordOtpComponent implements OnDestroy {
  // variable declarations

  text1: string = '';
  text2: string = '';
  text3: string = '';
  text4: string = '';
  otpVerified = false;

  private _unsubscribe$ = new Subject<void>();

  constructor(private service: UserService, private helper: HelperService) {}

  onSubmit(formData: NgForm) {
    if (formData.valid) {
      const otp =
        formData.value.text1 +
        formData.value.text2 +
        formData.value.text3 +
        formData.value.text4;
      this.service.submitForgotPasswordOtp(otp).subscribe((res) => {
        if (res.success) {
          this.otpVerified = true;
        } else {
          const message = res.message;
          this.helper.showToaster(message, res.success);
        }
      });
    }
  }

  move(event: any, previous: any, current: any, next: any) {
    const length = current.value.length;
    const maxLength = current.getAttribute('maxLength');
    if (length == maxLength) {
      if (next) {
        next.focus();
      }
    }
    if (event.key == 'Backspace') {
      if (previous) {
        previous.focus();
      }
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }
}
