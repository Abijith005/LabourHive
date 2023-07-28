import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { i_categoryResponse } from 'src/app/interfaces/adminInterfaces/i_categoryResponse';
import { i_registerJobProfile } from 'src/app/interfaces/userInterfaces/i_registerJobProfile';
import { MapboxService } from 'src/app/services/mapbox.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createjob-profile',
  templateUrl: './createjob-profile.component.html',
  styleUrls: ['./createjob-profile.component.css']
})
export class CreatejobProfileComponent implements OnInit {


  //variable declarations

  jobProfileForm: FormGroup = new FormGroup({})
  isLoading: boolean = false
  isSubmitted = false
  profilePic: string = ''
  categories: i_categoryResponse[] | null = null
  workImages: string[] = []
  suggestions: any[] = [];
  coordinates: number[] = [];


  constructor(private fb: FormBuilder,
    private service: UserService,
    private mapboxService:MapboxService

  ) { }



  ngOnInit(): void {


    //Reactive form validations

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

    this.service.getCategoryDetails().subscribe(res => {
      this.categories = res.categories || []
    })


  }


  //get form controls

  get formControls() {
    return this.jobProfileForm.controls
  }


  //event for getting image and converting it into base64 for profilePic

  onProfilePicSelect(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files?.length! > 0) {
      const reader = new FileReader()
      reader.readAsDataURL(input.files![0])
      reader.onloadend = () => {
        this.profilePic = reader.result as string
      }

    }
  }

  //event for getting image and converting it into base64 for workImage

  onWorkImageSelect(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files?.length! > 0) {
      const reader = new FileReader()
      reader.readAsDataURL(input.files![0])
      reader.onloadend = () => {
        this.workImages?.push(reader.result as string)
      }
    }

  }

  //delete images from the array

  deleteImage(index: number) {
    console.log(index);
    this.workImages.splice(index, 1)

  }


//fetch suggessions for locations

fetchSuggestions(value: string) {
  this.mapboxService.getSuggestions(value).subscribe(
    (response) => {
      this.suggestions = response.features.map((feature) => ({
        location: feature.place_name,
        coordinates: feature.center,
      }));
      this.setCoordinates(response.features[0].center);
    },
    (error) => {
      console.error('Error fetching suggestions:', error);
    }
  );
}

setCoordinates(center: number[]) {
  this.coordinates = center;
}





  // Form submission

  onSubmit() {
    this.isSubmitted = true

    //checking that the category selected is not 'Select Category'

    if (this.formControls['category'].value === 'Select Category') {
      this.formControls['category'].setErrors({ required: true })
      this.isSubmitted = false
      return
    }

    //form data to send to backend
    const formData: i_registerJobProfile = {
      name: this.formControls['name'].value,
      category: this.formControls['category'].value,
      wage: this.formControls['wage'].value,
      experience: this.formControls['experience'].value,
      profilePic: this.profilePic,
      selfDescription: this.formControls['selfDescription'].value,
      location: this.formControls['location'].value,
      workImages: this.workImages


    }


  }
}
