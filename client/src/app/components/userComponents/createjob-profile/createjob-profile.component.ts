import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { i_categoryResponse } from 'src/app/interfaces/adminInterfaces/i_categoryResponse';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createjob-profile',
  templateUrl: './createjob-profile.component.html',
  styleUrls: ['./createjob-profile.component.css']
})
export class CreatejobProfileComponent implements OnInit {

  jobProfileForm: FormGroup = new FormGroup({})
  isLoading: boolean = false
  isSubmitted = false
  profilePic!: File
  finalProfilePic: string = ''
  categories: i_categoryResponse[] | null = null
  workImages:string[]=[]

  constructor(private fb: FormBuilder,
    private service: UserService

  ) { }



  ngOnInit(): void {

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

    this.service.getCategoryDetails().subscribe(res=>{
      this.categories=res.categories||[]
    })


  }



  get formControls() {
    return this.jobProfileForm.controls
  }

  ImageTOBase(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.finalProfilePic = reader.result as string      
    }
  }

  onProfilePicSelect(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files?.length! > 0) {
      this.profilePic = input.files![0]
      this.ImageTOBase(this.profilePic)
    }
  }

  onWorkImageSelect(event:Event){    
    const input=event.target as HTMLInputElement
    if(input.files?.length!>0){
      const reader=new FileReader()
      reader.readAsDataURL(input.files![0])
      reader.onloadend=()=>{
        this.workImages?.push(reader.result as string)
      }
    }

    
  }

  deleteImage(index:number){
    console.log(index);
    this.workImages.splice(index,1)
    
  }



  onSubmit() {
    this.isSubmitted = true
    if (this.formControls['category'].value==='Select Category') {
      this.formControls['category'].setErrors({required:true})
     this.isSubmitted=false
     return
    }


  }
}
