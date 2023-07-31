import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, map, take, takeUntil } from 'rxjs';
import { i_categoryResponse } from 'src/app/interfaces/adminInterfaces/i_categoryResponse';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { i_mapboxResp } from 'src/app/interfaces/userInterfaces/i_mapboxResp';
import { i_suggestions } from 'src/app/interfaces/userInterfaces/i_suggestions';
import { MapboxService } from 'src/app/services/mapbox.service';
import { UserService } from 'src/app/services/user.service';
import { userDataState } from 'src/app/store/user.state';

@Component({
  selector: 'app-edit-job-profile',
  templateUrl: './edit-job-profile.component.html',
  styleUrls: ['./edit-job-profile.component.css']
})
export class EditJobProfileComponent implements OnInit, OnDestroy {

  //variable declarations

  jobProfileForm: FormGroup = new FormGroup({})
  isSubmitted: boolean = false
  isLoading: boolean = false
  jobProfileData!: i_jobProfile
  profilePic!: string
  workImages: string[] = []
  suggestions: i_suggestions[] = []
  categories: i_categoryResponse[] | null = null
  coordinates: number[] = []
  private ngUnsubscribe = new Subject()


  constructor(private fb: FormBuilder,
    private store:Store<userDataState>,
    private service: UserService,
    private mapboxService: MapboxService,
    ) {
    // this.jobProfileData = JSON.parse(JSON.stringify(data))
    // this.workImages = JSON.parse(JSON.stringify(data.workImages))
    // this.profilePic = data.profilePic
  }

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
      workImages: ['']

    })

    //fetching categories from store
    this.service.getCategoryDetails().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.categories = res.categories!
    })

    this.store.select('user').pipe(take(1)).subscribe((state) => {
      this.jobProfileData = state.jobProfileDatas as i_jobProfile;
      // Setting values to the form
      this.jobProfileForm.patchValue(this.jobProfileData);
      this.workImages = JSON.parse(JSON.stringify(this.jobProfileData.workImages))
    this.profilePic = this.jobProfileData.profilePic
    });
  }

  


  // getting forms controls

  get formControls() {
    return this.jobProfileForm.controls
  }

  //fetching suggestions for location from mapbox api
  fetchSuggestions(event: Event) {
    const input = event.target as HTMLInputElement
    const query = input.value.trim()
    this.mapboxService.getSuggestions(query).subscribe((res: i_mapboxResp) => {
      this.suggestions = res.features.map((feature => ({
        location: feature.place_name,
        coordinates: feature.center
      })))

    })


  }

  onSuggestionClick(suggestion: i_suggestions) {
    this.formControls['location'].patchValue(suggestion.location)
    this.coordinates = suggestion.coordinates
    this.suggestions = []
  }

  onProfilePicSelect(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files?.length! > 0) {
      const promise = this.readFielTobase64(input.files[0])
      promise.then((base64String => this.profilePic = base64String))
    }
  }

  //file to base 64

  readFielTobase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        const base64String = reader.result as string
        resolve(base64String)
      }
      reader.onerror = () => {
        reject(new Error('Failed to read file'))

      }
    })
  }

  deleteImage(index: number) {
    this.workImages.splice(index, 1)

  }

  onWorkImageSelect(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      const fileArray = Array.from(input.files)
      const fileReadPromises = fileArray.map(file => this.readFielTobase64(file))
      Promise.all(fileReadPromises).then(base64Strings => {
        this.workImages.push(...base64Strings)
      })
    }



  }

  onSubmit() {

    this.isSubmitted = true
    if (!this.jobProfileForm.valid) {
      return
    }

    const formData: i_jobProfile = {
      name: this.formControls['name'].value,
      category: this.formControls['category'].value,
      wage: this.formControls['wage'].value,
      experience: this.formControls['experience'].value,
      profilePic: this.profilePic,
      selfDescription: this.formControls['selfDescription'].value,
      location: this.formControls['location'].value,
      coordinates: this.coordinates!,
      workImages: this.workImages
    }

  // this.service.updateJobProfile(this.data).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res=>{

  // })





  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe()
  }

}