import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
import { JobService } from 'src/app/services/userServices/job.service';

@Component({
  selector: 'labourHive-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css'],
})
export class PostJobComponent implements OnInit {
  // variable declarations
  postJobForm: FormGroup = new FormGroup({});
  suggestions!: i_suggestions[];
  location: string = '';
  coordinates!: number[];
  categories!: i_category[];
  isSubmitted: boolean = false;
  selectedCategory: i_category | null = null;

  private _unsubscribe$ = new Subject<void>();
  constructor(
    private _matDialog: MatDialogRef<PostJobComponent>,
    private _fb: FormBuilder,
    private _mapboxServices: MapboxService,
    private _jobService: JobService,
    private _swalServices: SwalService
  ) {}

  ngOnInit(): void {
    this.postJobForm = this._fb.group({
      category: ['', [Validators.required]],
      experience: ['', [Validators.required, Validators.pattern('[0-9]*$')]],
      requiredLabour: [
        '',
        [Validators.required, Validators.pattern('^(0*(?:[1-9]))*$')],
      ],
      offeredWage: ['', [Validators.required, Validators.pattern('[0-9]*$')]],
      jobDescription: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });

    // get categories from local storage
    this.categories = JSON.parse(localStorage.getItem('categories')!);
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
    return this.postJobForm.controls;
  }

  slectSuggestion(feature: i_suggestions) {
    this.location = feature.location;
    this.coordinates = feature.coordinates;
    this.suggestions = [];
  }

  selectCategory(item: i_category) {
    this.selectedCategory = item;
    console.log(this.selectedCategory);
  }

  close() {
    this._matDialog.close();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (
      this.formControl['offeredWage'].value < this.selectedCategory?.basicWage!
    ) {
      this.formControl['offeredWage'].setErrors({ basicWage: true });
    }
    const startDate = new Date(this.formControl['startDate'].value).getTime();
    if (startDate <= new Date().getTime()) {
      this.formControl['startDate'].setErrors({ invalidDate: true });
    }

    if (!this.postJobForm.valid) {
      return;
    }

    const data: i_jobDetails = {
      category: this.selectedCategory?.name!,
      experience: this.formControl['experience'].value,
      requiredCount: this.formControl['requiredLabour'].value,
      wage: parseInt(this.formControl['offeredWage'].value),
      jobDescription: this.formControl['jobDescription'].value,
      startDate: this.formControl['startDate'].value,
      endDate: this.formControl['endDate'].value,
      location: this.location,
      coordinates: this.coordinates,
    };

    this._jobService.postJob(data).subscribe((res) => {
      if (res.success) {
        this._swalServices.showAlert('success', res.message, 'success');
      } else {
        this._swalServices.showAlert('failure', res.message, 'error');
      }
    });
  }
}
