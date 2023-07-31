import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { i_categoryResponse } from 'src/app/interfaces/adminInterfaces/i_categoryResponse';
import { i_mapboxResp } from 'src/app/interfaces/userInterfaces/i_mapboxResp';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { MapboxService } from 'src/app/services/mapbox.service';
import { UserService } from 'src/app/services/user.service';
import { i_suggestions } from 'src/app/interfaces/userInterfaces/i_suggestions';

// interface i_suggessions {
//   location: string,
//   coordinates: number[]
// }

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
  suggestions: i_suggestions[] = [];
  coordinates: number[] | null = null


  constructor(private fb: FormBuilder,
    private service: UserService,
    private mapboxService: MapboxService,
    private dialogRef: MatDialogRef<CreatejobProfileComponent>

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


  //getting form controls

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

  //event hab=ndling funtion for getting image and converting it into base64 for workImage


  onWorkImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      
      // Convert the FileList to an Array
      const filesArray = Array.from(input.files);
      const fileReadPromises = filesArray.map((file) => this.readFileAsBase64(file));

      // Use Promise.all to handle all the asynchronous file reading operations
      Promise.all(fileReadPromises).then((base64Strings) => {
        this.workImages?.push(...base64Strings);
      });
    }
  }

  private readFileAsBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read the file.'));
      };
    });
  }


  //delete images from the array

  deleteImage(index: number) {
    this.workImages.splice(index, 1)

  }


  // getting suggessions for location using mapbox

  fetchSuggestions(event: Event) {
    const inputElement = event.target as HTMLInputElement
    const value = inputElement.value

    if (!value) {
      this.suggestions = [];
      return;
    }
    this.mapboxService.getSuggestions(value).subscribe(
      (response: i_mapboxResp) => {
        this.suggestions = response.features.map((feature) => ({
          location: feature.place_name,
          coordinates: feature.center,
        }));

      },
      (error) => {
        console.error('Error fetching suggestions:', error);
      }
    );
  }


  //setting suggested value to location

  onSuggestionClick(suggestion: i_suggestions) {
    this.formControls['location'].setValue(suggestion.location)
    this.coordinates = suggestion.coordinates
    this.suggestions = []

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

    if (this.jobProfileForm.valid) {

      //form data to send to backend
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

      this.isLoading = true

      //reducing size of the modal
      this.dialogRef.updateSize('450px','190px')


      this.service.uploadJobProfile(formData).subscribe(res => {
        this.isLoading = false
        this.dialogRef.close()

      })
    }


  }
}
