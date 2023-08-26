import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserProfileService } from '../../userServices/user-profile.service';
import { Subject, takeUntil } from 'rxjs';
import { SwalService } from 'src/app/services/commonServices/swal.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnDestroy {
  // variable declarations
  stars: number[] = [0, 1, 2, 3, 4];
  rating: number = 0;
  review: string = '';

  private _unsubscribe = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private _data: { labour_id: string; hire_id: string },
    private _matDialogRef: MatDialogRef<RatingComponent>,
    private _profileService: UserProfileService,
    private _swalService: SwalService
  ) {}

  rate(value: number) {
    this.rating = value + 1;
  }

  close() {
    this._matDialogRef.close();
  }

  onSubmit() {
    if (!this.rating) {
      return;
    }

    this._profileService
      .postReview(
        this.review,
        this.rating,
        this._data.labour_id,
        this._data.hire_id
      )
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((res) => {
        console.log(res);
        if (res.success) {
          this._swalService.showAlert('Success', res.message, 'success');
          this._matDialogRef.close(res.review_id)
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
