import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { i_categoryResponse } from 'src/app/interfaces/adminInterfaces/i_categoryResponse';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { i_mapboxResp } from 'src/app/interfaces/userInterfaces/i_mapboxResp';
import { i_suggestions } from 'src/app/interfaces/userInterfaces/i_suggestions';
import { HelperService } from 'src/app/services/commonServices/helper.service';
import { MapboxService } from 'src/app/services/commonServices/mapbox.service';
import { UserService } from 'src/app/pipes/user-module/userServices/user.service';
import { jobProfile } from 'src/app/store/user.actions';
import { userDataState } from 'src/app/store/user.state';

@Component({
  selector: 'labourHive-edit-job-profile',
  templateUrl: './edit-job-profile.component.html',
  styleUrls: ['./edit-job-profile.component.css'],
})
export class EditJobProfileComponent implements OnInit, OnDestroy {
  //variable declarations

  jobProfileForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  jobProfileData!: i_jobProfile;
  profilePic!: string;
  workImages: string[] = [];
  suggestions: i_suggestions[] = [];
  categories: i_categoryResponse[] | null = null;
  coordinates: number[] = [];

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store<userDataState>,
    private service: UserService,
    private mapboxService: MapboxService,
    private helper: HelperService,
    private matDialogRef: MatDialogRef<EditJobProfileComponent>
  ) {}

  ngOnInit(): void {
    //reactive form validations

    this.jobProfileForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      wage: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      experience: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      profilePic: ['', [Validators.required]],
      selfDescription: ['', [Validators.required]],
      location: ['', [Validators.required]],
      workImages: [''],
    });

    //fetching categories from localStorage

    this.categories = JSON.parse(localStorage.getItem('categories')!);

    this.store
      .select('user')
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((state) => {
        this.jobProfileData = state.jobProfileDatas as i_jobProfile;

        // Setting values to the form
        this.jobProfileForm.patchValue(this.jobProfileData);
        this.workImages = JSON.parse(
          JSON.stringify(this.jobProfileData.workImages)
        );
        this.profilePic = this.jobProfileData.profilePic;
      });
  }

  // getting forms controls

  get formControls() {
    return this.jobProfileForm.controls;
  }

  //fetching suggestions for location from mapbox api
  fetchSuggestions(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();
    this.mapboxService
      .getSuggestions(query)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res: i_mapboxResp) => {
        this.suggestions = res.features.map((feature) => ({
          location: feature.place_name,
          coordinates: feature.center,
        }));
      });
  }

  onSuggestionClick(suggestion: i_suggestions) {
    this.formControls['location'].patchValue(suggestion.location);
    this.coordinates = suggestion.coordinates;
    this.suggestions = [];
  }

  onProfilePicSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files?.length! > 0) {
      const promise = this.readFielTobase64(input.files[0]);
      promise.then((base64String) => (this.profilePic = base64String));
    }
  }

  //file to base64String

  readFielTobase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
    });
  }

  //delete Image
  deleteImage(index: number) {
    this.workImages.splice(index, 1);
  }

  onWorkImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const fileArray = Array.from(input.files);
      const fileReadPromises = fileArray.map((file) =>
        this.readFielTobase64(file)
      );
      Promise.all(fileReadPromises).then((base64Strings) => {
        this.workImages.push(...base64Strings);
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.jobProfileForm.valid) {
      return;
    }
    this.matDialogRef.updateSize('450px', '190px');
    this.isLoading = true;
    const formData: i_jobProfile = {
      name: this.formControls['name'].value,
      category: this.formControls['category'].value,
      wage: this.formControls['wage'].value,
      experience: this.formControls['experience'].value,
      profilePic: this.profilePic,
      selfDescription: this.formControls['selfDescription'].value,
      location: this.formControls['location'].value,
      coordinates: this.coordinates!,
      workImages: this.workImages,
    };

    this.service
      .updateJobProfile(formData)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.isLoading = false;
        this.helper.showToaster(res.message, res.success);
        if (res.success) {
          formData.rating = this.jobProfileData.rating;
          this.store.dispatch(jobProfile({ profileDatas: formData }));
          this.matDialogRef.close();
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
