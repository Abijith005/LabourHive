import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs';
import { i_category } from 'src/app/interfaces/adminInterfaces/i_category';
import { i_jobDetails } from 'src/app/interfaces/userInterfaces/i_jobDetails';
import { i_mapboxResp } from 'src/app/interfaces/userInterfaces/i_mapboxResp';
import { i_suggestions } from 'src/app/interfaces/userInterfaces/i_suggestions';
import { MapboxService } from 'src/app/services/commonServices/mapbox.service';
import { SwalService } from 'src/app/services/commonServices/swal.service';
import { JobService } from 'src/app/modules/user/userServices/job.service';
import { PostJobComponent } from '../../post-job/post-job.component';

@Component({
  selector: 'labourHive-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css'],
})
export class EditJobComponent implements OnInit,OnDestroy {
  // variable declarations
  editJobForm: FormGroup = new FormGroup({});
  suggestions!: i_suggestions[];
  location: string = '';
  coordinates!: number[];
  categories!: i_category[];
  isSubmitted: boolean = false;
  selectedCategory!: i_category
  jobDetails!:i_jobDetails

  private _unsubscribe$ = new Subject<void>();
  constructor(
    @Inject(MAT_DIALOG_DATA) private _data:i_jobDetails,
    private _matDialog: MatDialogRef<PostJobComponent>,
    private _fb: FormBuilder,
    private _mapboxServices: MapboxService,
    private _jobService: JobService,
    private _swalServices: SwalService
  ) {
    this.jobDetails=_data    
    
  }

  ngOnInit(): void {
    this.editJobForm = this._fb.group({
      categoryName: ['', [Validators.required]],
      experience: ['', [Validators.required, Validators.pattern('[0-9]*$')]],
      requiredCount: [
        '',
        [Validators.required, Validators.pattern('^(0*(?:[1-9]))*$')],
      ],
      wage: ['', [Validators.required, Validators.pattern('[0-9]*$')]],
      jobDescription: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });

    // get categories from local storage
    this.categories = JSON.parse(localStorage.getItem('categories')!);
    this.editJobForm.patchValue(this.jobDetails)
    this.selectedCategory=this.categories.find((e)=>e.name==this.jobDetails.categoryName)!
  }

  getSuggestions() {
    this.formControl['location'].valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((key: string) => {
          return this._mapboxServices.getSuggestions(key);
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((res: i_mapboxResp) => {
        this.suggestions = res.features.map((feature) => ({
          location: feature.place_name,
          coordinates: feature.center,
        }));
      });
  }

  public get formControl() {
    return this.editJobForm.controls;
  }

  slectSuggestion(feature: i_suggestions) {
    this.location = feature.location;
    this.coordinates = feature.coordinates;
    this.suggestions = [];
  }

  selectCategory(item: i_category) {
    this.selectedCategory = item;
  }

  close() {
    this._matDialog.close();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (
      this.formControl['wage'].value < this.selectedCategory?.basicWage!
    ) {
      this.formControl['wage'].setErrors({ basicWage: true });
    }
    const startDate = new Date(this.formControl['startDate'].value).getTime();
    if (startDate <= new Date().getTime()) {
      this.formControl['startDate'].setErrors({ invalidDate: true });
    }

    if (!this.editJobForm.valid) {
      return;
    }

    const data: i_jobDetails = {
      categoryName: this.selectedCategory?._id!,
      experience: this.formControl['experience'].value,
      requiredCount: this.formControl['requiredCount'].value,
      wage: parseInt(this.formControl['wage'].value),
      jobDescription: this.formControl['jobDescription'].value,
      startDate:new Date(this.formControl['startDate'].value),
      endDate:new Date(this.formControl['endDate'].value),
      location: this.location,
      coordinates: this.coordinates,
    };

    console.log(data);
    
    this._jobService.editJob(data,this.jobDetails._id!).pipe(takeUntil(this._unsubscribe$)).subscribe((res) => {
      if (res.success) {
        this._swalServices.showAlert('success', res.message, 'success');
        this._matDialog.close();
      } else {
        this._swalServices.showAlert('failure', res.message, 'error');
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }
}
