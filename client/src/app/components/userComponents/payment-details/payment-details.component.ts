import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EMPTY, Observable, Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { i_mapboxResp } from 'src/app/interfaces/userInterfaces/i_mapboxResp';
import { MapboxService } from 'src/app/services/mapbox.service';


@Component({
  selector: 'labourHive-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  //variable declarations
  jobprofileDetails!: i_jobProfile
  isSubmitted: boolean = false
  hireForm: FormGroup = new FormGroup({})
  suggestions$: Observable<string[]> | [] = []

  private _locationChanged$=new Subject<string>()
  private _unSubscribe$=new Subject()

  constructor(private matDialogRef: MatDialogRef<PaymentDetailsComponent>,
    private _fb: FormBuilder,
    private _mapboxService: MapboxService) { }

    
  ngOnInit(): void {
    this.matDialogRef.updateSize('500px', '700px')

    this.hireForm = this._fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      location: ['', [Validators.required]]
    })

    this._locationChanged$.pipe(
      debounceTime(300),distinctUntilChanged(),
      switchMap((quey:string)=>this.getSuggestion(quey)),
      takeUntil(this._unSubscribe$)
    )

  }

  //get form controls
  get formControls() {
    return this.hireForm.controls
  }

  //get location suggestion from map box

  getSuggestion(string:string) {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();
    this.suggestions$ = this._mapboxService.getSuggestions(query).pipe(
      switchMap((res: i_mapboxResp) => {
        return res.features.map((feature) => ({
          location: feature.place_name,
          coordinates: feature.center,
        }));
      })
    );
  }





  confirmPayment() {
    this.isSubmitted = true

    if (!this.hireForm.valid) {
      return
    }

  }


}
