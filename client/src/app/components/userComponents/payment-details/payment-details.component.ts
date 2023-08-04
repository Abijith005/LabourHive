import { Component,Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { i_mapboxResp } from 'src/app/interfaces/userInterfaces/i_mapboxResp';
import { i_suggestions } from 'src/app/interfaces/userInterfaces/i_suggestions';
import { MapboxService } from 'src/app/services/mapbox.service';


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
  isDateSelected=false
  totalWage:number|null=null
  totalPayable!:number
  totalDays:number|null=null
  
  private _locationChanged$ = new Subject<string>()
  private _unSubscribe$ = new Subject()

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: i_jobProfile,
    private matDialogRef: MatDialogRef<PaymentDetailsComponent>,
    private _fb: FormBuilder,
    private _mapboxService: MapboxService) {
    this.matDialogRef.updateSize('500px', '700px')
    this.labourDetails = _data
    this.totalPayable=Number(this.labourDetails?.wage)

  }


  ngOnInit(): void {
    
    this.hireForm = this._fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
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

      const startDate=new Date(this.formControls['startDate'].value).getTime()
      const endDate=new Date(this.formControls['endDate'].value).getTime()

      if (startDate< new Date().getTime()||startDate>endDate) {
        
        if (startDate< new Date().getTime()) {
          this.formControls['startDate'].setErrors({lesserStartDate:true})
        }
        if (startDate>endDate) {
          this.formControls['endDate'].setErrors({greaterEndDate:true})
        }
        this.isDateSelected=true
        this.totalWage=null
        this.totalDays=null
        return
      }

      const difference =endDate-startDate
      this.totalDays=difference/(1000*60*60*24)+1 
      this.totalWage=this.totalDays*Number(this.labourDetails?.wage)
      this.totalPayable=this.totalWage+(0.1*this.totalWage)       

    }
  }


  confirmPayment() {
    this.isSubmitted = true

    if (!this.hireForm.valid) {
      return
    }

  }

  ngOnDestroy(): void {
    this._unSubscribe$.unsubscribe()
  }


}
