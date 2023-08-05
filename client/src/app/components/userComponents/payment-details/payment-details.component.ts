import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { i_mapboxResp } from 'src/app/interfaces/userInterfaces/i_mapboxResp';
import { i_paymentDetails } from 'src/app/interfaces/userInterfaces/i_paymentDetails';
import { i_suggestions } from 'src/app/interfaces/userInterfaces/i_suggestions';
import { MapboxService } from 'src/app/services/mapbox.service';
import { SwalService } from 'src/app/services/swal.service';
import { UserService } from 'src/app/services/user.service';
import { WindoRefService } from 'src/app/services/windo-ref.service';




@Component({
  selector: 'labourHive-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit, OnDestroy {

  //variable declarations
  jobprofileDetails!: i_jobProfile
  isSubmitted: boolean = false
  hireForm: FormGroup = new FormGroup({})
  suggestions: i_suggestions[] | [] = []
  labourDetails: i_jobProfile | null = null
  isDateSelected = false
  totalWage: number | null = null
  totalPayable!: number
  totalDays: number | null = null

  private _locationChanged$ = new Subject<string>()
  private _unSubscribe$ = new Subject()

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: i_jobProfile,
    private matDialogRef: MatDialogRef<PaymentDetailsComponent>,
    private _fb: FormBuilder,
    private _mapboxService: MapboxService,
    private _service: UserService,
    private _swalService: SwalService,
    private _winRef: WindoRefService
  ) {


    this.matDialogRef.updateSize('500px', '700px')
    this.labourDetails = _data
    this.totalPayable = Number(this.labourDetails?.wage)

  }


  ngOnInit(): void {

    this.hireForm = this._fb.group({
      startDate: [Date, [Validators.required]],
      endDate: [Date, [Validators.required]],
      location: ['', [Validators.required]]
    })

    //switching to new obervable 
    this._locationChanged$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((query: string) => this.getSuggestions(query)),
      takeUntil(this._unSubscribe$)
    ).subscribe((res: i_mapboxResp) => {
      this.suggestions = res.features.map((feature) => ({
        location: feature.place_name,
        coordinates: feature.center
      })

      )
    })
  }

  //get form controls
  get formControls() {
    return this.hireForm.controls
  }

  //get location suggestion from map box

  getSuggestions(query: string) {
    return this._mapboxService.getSuggestions(query)
  }

  //input event handling

  inputChange(event: Event) {
    const input = event.target as HTMLInputElement
    const quey = input.value.trim()
    this._locationChanged$.next(quey)

  }

  //select location from suggestions

  selectLocation(suggestion: i_suggestions) {
    this.formControls['location'].patchValue(suggestion.location)
    this.suggestions = []
  }

  //event handling during date change and setting amount

  onDateChange() {

    if (!this.formControls['startDate'].errors && !this.formControls['endDate'].errors) {

      const startDate = new Date(this.formControls['startDate'].value).getTime()
      const endDate = new Date(this.formControls['endDate'].value).getTime()

      if (startDate < new Date().getTime() || startDate > endDate) {

        if (startDate < new Date().getTime()) {
          this.formControls['startDate'].setErrors({ lesserStartDate: true })
        }
        if (startDate > endDate) {
          this.formControls['endDate'].setErrors({ greaterEndDate: true })
        }
        this.isDateSelected = true
        this.totalWage = null
        this.totalDays = null
        return
      }

      const difference = endDate - startDate
      this.totalDays = difference / (1000 * 60 * 60 * 24) + 1
      this.totalWage = this.totalDays * Number(this.labourDetails?.wage)
      this.totalPayable = this.totalWage + (0.1 * this.totalWage)

    }
  }




  confirmPayment() {
    this.isSubmitted = true

    if (!this.hireForm.valid) {
      return
    }

    const data:i_paymentDetails = {
      labour_id: this.labourDetails?._id!,
      labourName: this.labourDetails?.name!,
      wage: this.labourDetails?.wage!,
      totalDays: Number(this.totalDays),
      totalAmount: Number(this.totalPayable),
      startDate: this.formControls['startDate'].value,
      endDate: this.formControls['endDate'].value,
      location: this.formControls['location'].value,
      coordinates:this.labourDetails?.coordinates!
    }
    Object.freeze(data)

    this._service.hirePayment(data.totalAmount).pipe(takeUntil(this._unSubscribe$)).subscribe(res => {
      console.log(res);
      
      if (res.success) {
        this.handleRazorPay(res.order, data)
      }
      else {
        this._swalService.showAlert('Ooops!!','Unknown error ocuured please try agian later','error')
      }
    })
  }


  handleRazorPay(order: any, data: any) {
    console.table(order);

    const options: any = {
      key: environment.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Labour Hive",
      description: "Hiring Payment",
      order_id: order.id,
      handler: (response: any) => {
        this._service.verifyPayment({ response, ...data }).pipe(takeUntil(this._unSubscribe$)).subscribe((res) => {

          if (!res.success) {
            this._swalService.showAlert('Payment Failed ', res.message, 'error')
          } else {

            this._swalService.showAlert('Payment Success ', res.message, 'success')
            // navigate("/profile")
          }
          // setShowBookNow(false)
          // setRefresh(!refresh)
        })
      }
    }

    const rzp = new this._winRef.nativeWindow.Razorpay(options);
    rzp.open();
    // rzp.on('payment.failed', (response:any) => {
    //   this._swalService.showAlert("Payment Failed",'Unknown error please try again','error')
    // })
    
   ;
  }





  ngOnDestroy(): void {
    this._unSubscribe$.unsubscribe()
  }







}
