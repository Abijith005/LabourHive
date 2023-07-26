import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createjob-profile',
  templateUrl: './createjob-profile.component.html',
  styleUrls: ['./createjob-profile.component.css']
})
export class CreatejobProfileComponent implements OnInit {

  jobProfileForm:FormGroup=new FormGroup({})
  isLoading:boolean=false
  isSubmitted=false
  profilePic!:File
  finalProfilePic:string=''

  constructor(private fb:FormBuilder,
    
    ){}



  ngOnInit(): void {
    
    this.jobProfileForm=this.fb.group({

      name:['',[Validators.required]],
      category:['',[Validators.required]],
      wage:['',[Validators.required,Validators.pattern('[0-9]*')]],
      experience:['',[Validators.required,Validators.pattern('[0-9]*')]],
      profilePic:['',[Validators.required]],
      selfDescrption:['',[Validators.required]],
      location:['',[Validators.required]],
      workImages:['']


    })
  }


  get formControls(){
   return this.jobProfileForm.controls
  }

  ImageTOBase(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.finalProfilePic = reader.result as string
    }
  }

  onProfilePicSelect(event:Event){
    const input=event.target as HTMLInputElement
    if (input.files?.length!>0) {
      this.profilePic=input.files![0]
      this.ImageTOBase(this.profilePic)

    }
    

  }



  onSubmit(){
    this.isSubmitted=true
  }
}
