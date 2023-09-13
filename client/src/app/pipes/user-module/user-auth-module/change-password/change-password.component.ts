import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HelperService } from 'src/app/services/commonServices/helper.service';
import { UserService } from 'src/app/pipes/user-module/userServices/user.service';
@Component({
  selector: 'labourHive-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit,OnDestroy {
  // variable declarations

  changePasswordForm: FormGroup = new FormGroup({});
  isSubmitted = false;

  private _unsubscribe$=new Subject<void>()

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private helper: HelperService
  ) {}
  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern('^[\\S]{3,}$')]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.changePasswordForm.controls;
  }

  onsubmit() {
    this.isSubmitted = true;

    if (this.changePasswordForm.valid) {
      const data = this.changePasswordForm.value;
      this.service.changePassword(data).pipe(takeUntil(this._unsubscribe$)).subscribe((res) => {
        if (res.success) {
          this.router
            .navigateByUrl('', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['login']);

              const message = res.message;
              this.helper.showToaster(message, res.success);
            });
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
