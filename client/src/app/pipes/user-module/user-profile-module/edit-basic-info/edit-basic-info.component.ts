import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserProfileService } from '../../userServices/user-profile.service';
import { Store } from '@ngrx/store';
import { userDataState } from 'src/app/store/user.state';
import { Subject, takeUntil } from 'rxjs';
import { SwalService } from 'src/app/services/commonServices/swal.service';
import { HelperService } from 'src/app/services/commonServices/helper.service';
interface profileData {
  name?: string;
  email?: string;
  mobileNumber?: string;
  profilePicture?: string;
}
@Component({
  selector: 'app-edit-basic-info',
  templateUrl: './edit-basic-info.component.html',
  styleUrls: ['./edit-basic-info.component.css'],
})
export class EditBasicInfoComponent implements OnInit {
  text1: string = '';
  text2: string = '';
  text3: string = '';
  text4: string = '';
  isSubmitted: boolean = false;
  profilePic: string = '';
  userData: profileData | null = null;
  serverOtp:string|null=null
  otp: string | null = null;
  otpTemplate: boolean = false;
  data: profileData | null = null;

  editForm: FormGroup = new FormGroup({});

  private _unsubscribe$ = new Subject();

  constructor(
    private _matDialogRef: MatDialogRef<EditBasicInfoComponent>,
    private _fb: FormBuilder,
    private _profileService: UserProfileService,
    private _store: Store<userDataState>,
    private _toaster:HelperService
  ) {}

  ngOnInit(): void {
    this.editForm = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
    });

    this._store
      .select('user')
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((data) => {
        this.userData = data.userDatas;
      });
    this.editForm.patchValue(this.userData!);
  }

  get formControls() {
    return this.editForm.controls;
  }

  cancel() {
    this._matDialogRef.close();
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
        previous.value = '';
      }
    }
  }

  otpSubmit() {
    this.otp = this.text1 + this.text2 + this.text3 + this.text4;
    if (this.serverOtp === this.otp) {
      this._profileService.updateUserProfile(this.data!).subscribe();
    }
    else{
      this._toaster.showToaster('Invalid OTP',false)
    }


  }

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files;
    if (file && file.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onloadend = () => {
        this.profilePic = reader.result as string;
      };
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.editForm.valid) {
      return;
    }

    this.data = {
      name: this.formControls['name']?.value
        ? this.formControls['name'].value
        : '',
      email: this.formControls['email']?.value
        ? this.formControls['email'].value
        : '',
      mobileNumber: this.formControls['mobileNumber']?.value
        ? this.formControls['mobileNumber'].value
        : '',
      profilePicture: this.profilePic ? this.profilePic : '',
    };
    if (this.data.email) {
      this.otpTemplate = true;
      this._profileService.changeEmail(this.data?.email!).subscribe((res) => {
        this.serverOtp=res.otp
      });
      return;
    }
    this._profileService.updateUserProfile(this.data).subscribe();
  }
}
