import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { HelperService } from 'src/app/services/commonServices/helper.service';
import { adminLogin } from 'src/app/store/admin.actions';
import { adminDataState } from 'src/app/store/admin.state';

@Component({
  selector: 'labourHive-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit,OnDestroy {
  // variable declarations

  isSubmitted = false;
  loginForm: FormGroup = new FormGroup({});

  private _unsubscribe$= new Subject<void>();

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  constructor(
    private fb: FormBuilder,
    private _service: AdminService,
    private _router: Router,
    private _helper: HelperService,
    private _store:Store<adminDataState>
  ) {}

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this._service.adminLogin(this.loginForm.value).pipe(takeUntil(this._unsubscribe$)).subscribe((res) => {
        let message = 'Invalid credentilas';
        if (res.success) {
          this._store.dispatch(adminLogin({isLoggedIn:true}))
          this._router.navigate(['/admin']);
          message = 'Do your actions';
        }
        this._helper.showToaster(message, res.success);
      });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }
}
