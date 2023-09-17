import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditBasicInfoComponent } from '../edit-basic-info/edit-basic-info.component';
import { Store } from '@ngrx/store';
import { userDataState } from 'src/app/store/user.state';
import { Subject, takeUntil } from 'rxjs';
import { i_UserDetails } from 'src/app/interfaces/userInterfaces/i_user-details';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from '../../userServices/user-profile.service';
import { SwalService } from 'src/app/services/commonServices/swal.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
})
export class BasicInfoComponent implements OnInit, OnDestroy {
  // varibel declaration
  changePassword = false;
  userData: i_UserDetails | null = null;
  passwordForm: FormGroup = new FormGroup({});
  isSubmitted = false;

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _matDialog: MatDialog,
    private _store: Store<userDataState>,
    private _profileService: UserProfileService,
    private _fb: FormBuilder,
    private _swalService:SwalService
  ) {}

  ngOnInit(): void {
    this._store
      .select('user')
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((data) => {
        this.userData = data.userDatas;
      });

    this.passwordForm = this._fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [Validators.required, Validators.pattern('^[\\S]{3,}$')],
      ],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.passwordForm.controls;
  }
  onEdit() {
    this._matDialog.open(EditBasicInfoComponent, {
      width: '400px',
      disableClose: true,
    });
  }

  ChangePassword() {
    this.changePassword = !this.changePassword;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (!this.passwordForm.valid) {
      return;
    }

    const data = {
      currentPassword: this.formControls['currentPassword'].value,
      newPassword: this.formControls['newPassword'].value,
    };
    Object.freeze(data);

    this._profileService.changePassword(data).pipe(takeUntil(this._unsubscribe$)).subscribe(res=>{
      const title=res.success?'success':'Failed'
      this._swalService.showAlert(title,res.message,title)
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
