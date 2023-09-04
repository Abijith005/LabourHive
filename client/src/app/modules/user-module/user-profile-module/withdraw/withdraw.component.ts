import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserProfileService } from '../../userServices/user-profile.service';
import { Subject, takeUntil } from 'rxjs';
import { SwalService } from 'src/app/services/commonServices/swal.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css'],
})
export class WithdrawComponent implements OnInit, OnDestroy {
  // variable declarations
  isSubmitted: boolean = false;
  withdrawForm: FormGroup = new FormGroup({});

  private _unsubscribe$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private _total:number,
    private _fb: FormBuilder,
    private _matDialogRef: MatDialogRef<WithdrawComponent>,
    private _profileServices: UserProfileService,
    private _swalService:SwalService
  ) {}

  ngOnInit(): void {
    this.withdrawForm = this._fb.group({
      accountHolder: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      ifscCode: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      password: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.withdrawForm.controls;
  }

  close() {
    this._matDialogRef.close();
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.formControls['amount'].value>this._total) {
      this.formControls['amount'].setErrors({greaterAmount:true})
    }
    if (!this.withdrawForm.valid) {
      return;
    }

    const data = {
      accountHolder: this.formControls['accountHolder'].value,
      accountNumber: this.formControls['accountNumber'].value,
      ifscCode: this.formControls['ifscCode'].value,
      amount: this.formControls['amount'].value,
      password: this.formControls['password'].value,
    };
    Object.freeze(data);

    this._profileServices
      .withdrawRequest(data)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(res=>{
        const title=res.success?'success':'Failed'
        this._swalService.showAlert(title,res.message,title)
        
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
