import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { i_mapboxResp } from 'src/app/interfaces/userInterfaces/i_mapboxResp';
import { i_paymentDetails } from 'src/app/interfaces/userInterfaces/i_paymentDetails';
import { i_suggestions } from 'src/app/interfaces/userInterfaces/i_suggestions';
import { MapboxService } from 'src/app/services/commonServices/mapbox.service';
import { SwalService } from 'src/app/services/commonServices/swal.service';
import { RazorpayService } from 'src/app/modules/user-module/userServices/razorpay.service';
import { UserService } from 'src/app/modules/user-module/userServices/user.service';
import { i_jobDetails } from 'src/app/interfaces/userInterfaces/i_jobDetails';
import { Location } from '@angular/common';
import { JobService } from '../../userServices/job.service';

@Component({
  selector: 'labourHive-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css'],
})
export class PaymentDetailsComponent implements OnInit, OnDestroy {
  //variable declarations
  jobprofileDetails!: i_jobProfile;
  isSubmitted: boolean = false;
  hireForm: FormGroup = new FormGroup({});
  suggestions: i_suggestions[] | [] = [];
  labourDetails: i_jobProfile | null = null;
  isDateSelected = false;
  totalWage: number | null = null;
  totalPayable: number | null = null;
  totalDays: number | null = null;
  postedJobDetails: i_jobDetails | null = null;
  isReadOnly: boolean = false;
  coordinates: number[] | [] = [];
  application_id: string | null = null;

  private _locationChanged$ = new Subject<string>();
  private _unsubscribe$ = new Subject<void>();

  constructor(
    // injecting data from parent to matdialog

    @Inject(MAT_DIALOG_DATA)
    private _data: { profileData: i_jobProfile; application_id: string | null },
    private matDialogRef: MatDialogRef<PaymentDetailsComponent>,
    private _fb: FormBuilder,
    private _mapboxService: MapboxService,
    private _service: UserService,
    private _swalService: SwalService,
    private _razorpayService: RazorpayService,
    private _jobService: JobService,
    private _location: Location,
    private _cdRef: ChangeDetectorRef
  ) {
    //matDialog resizing
    this.matDialogRef.updateSize('500px', '700px');
    this.labourDetails = _data.profileData;
    this.application_id = _data.application_id;
  }

  ngOnInit(): void {
    this.hireForm = this._fb.group({
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      location: ['', [Validators.required]],
    });

    // updateing size of the dialogbox
    this.matDialogRef.updateSize('500px', '800px');

    //switching to new obervable
    this._locationChanged$
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((query: string) => this.getSuggestions(query)),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((res: i_mapboxResp) => {
        this.suggestions = res.features.map((feature) => ({
          location: feature.place_name,
          coordinates: feature.center,
        }));
      });

    //if the payment is for posted job
    if (this._data.application_id) {
      // getting posted job details from db
      this._jobService
        .getSingleJobDatas(this._data.application_id)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((res) => {
          if (res.success) {
            this.postedJobDetails = res.data;
            console.log('posted job details',this.postedJobDetails);
            
            // patching values to the form values
            this.formControls['startDate'].patchValue(
              new Date(this.postedJobDetails.startDate)
                .toISOString()
                .split('T')[0]
            );
            this.formControls['endDate'].patchValue(
              new Date(this.postedJobDetails.endDate)
                .toISOString()
                .split('T')[0]
            );
            this.onDateChange();
          }
          this.isReadOnly = true;
          this.formControls['location'].patchValue(
            this.postedJobDetails?.location
          );
        });
    } else {
      // adding description to the form control
      this.hireForm.addControl(
        'description',
        new FormControl('', [Validators.required])
      );
    }
  }

  //get form controls
  get formControls() {
    return this.hireForm.controls;
  }

  //get location suggestion from map box

  getSuggestions(query: string) {
    return this._mapboxService.getSuggestions(query);
  }

  //input event handling

  inputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const quey = input.value.trim();
    this._locationChanged$.next(quey);
  }

  //select location from suggestions

  selectLocation(suggestion: i_suggestions) {
    this.formControls['location'].patchValue(suggestion.location);
    this.coordinates = suggestion.coordinates;
    this.suggestions = [];
  }

  //event handling during date change and setting amount

  onDateChange() {
    if (
      !this.formControls['startDate'].errors &&
      !this.formControls['endDate'].errors
    ) {
      const startDate = new Date(
        this.formControls['startDate'].value
      ).getTime();
      const endDate = new Date(this.formControls['endDate'].value).getTime();

      if (startDate < new Date().getTime() || startDate > endDate) {
        //custom validation for date

        if (startDate < new Date().getTime()) {
          this.formControls['startDate'].setErrors({ lesserStartDate: true });
        }
        if (startDate > endDate) {
          this.formControls['endDate'].setErrors({ greaterEndDate: true });
        }
        this.isDateSelected = true;
        this.totalWage = null;
        this.totalDays = null;
        this.totalPayable = null;
        return;
      }

      //getting total days and amount
      const difference = endDate - startDate;
      this.totalDays = difference / (1000 * 60 * 60 * 24) + 1;
      this.totalWage =
        this.totalDays *
        Number(
          this.postedJobDetails
            ? this.postedJobDetails.wage
            : this.labourDetails?.wage
        );
      this.totalPayable = this.totalWage + 0.01 * this.totalWage;
    }
  }

  //go back
  goBack() {
    this._location.back();
    this._cdRef.detectChanges();
  }

  //payment controll
  confirmPayment() {
    this.isSubmitted = true;

    if (!this.hireForm.valid) {
      console.log(
        this.formControls['description'],
        'form controllllllllllllssssssssssssssss'
      );

      return;
    }

    //datas to send backend
    const data: i_paymentDetails = {
      labour_id: this.labourDetails?.user_id!,
      labourName: this.labourDetails?.name!,
      wage: this.labourDetails?.wage!,
      category: this.labourDetails?.category!,
      totalDays: Number(this.totalDays),
      totalAmount: Number(this.totalPayable),
      startDate: new Date(this.formControls['startDate'].value),
      endDate: new Date(this.formControls['endDate'].value),
      location: this.formControls['location'].value,
      offeredWage: this.postedJobDetails ? this.postedJobDetails.wage : null,
      coordinates: this.postedJobDetails
        ? this.postedJobDetails.coordinates
        : this.coordinates,
      job_id: this.postedJobDetails ? this.postedJobDetails._id : null,
      jobDescription:this.formControls['description']?.value
    };
    Object.freeze(data);

    //getting order_id for razorpay
    this._service
      .hirePayment(data.totalAmount)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        if (res.success) {
          //confirming payment and verfying
          this._razorpayService
            .handleRazorPay(res.order, data)
            .then(async (res) => {
              if (res.success) {
                this.closeDialogBox();
                const confirmation = await this._swalService.showAlert(
                  'Payment Success ',
                  'Hired labour successfully',
                  'success'
                );
                if (confirmation) {
                  this.goBack();
                }
                if (this._data.application_id) {
                  this._jobService
                    .updateApplcation(this._data.application_id, 'hired')
                    .pipe(takeUntil(this._unsubscribe$))
                    .subscribe();
                }
              } else {
                this._swalService.showAlert(
                  'Payment Failed ',
                  'payment verification failed',
                  'error'
                );
              }
            });
        } else {
          this._swalService.showAlert(
            'Ooops!!',
            'Unknown error ocuured please try agian later',
            'error'
          );
        }
      });
  }

  closeDialogBox() {
    this.matDialogRef.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
