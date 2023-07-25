import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
changePasswordForm:FormGroup=new FormGroup({})
isSubmitted=false

constructor(private fb:FormBuilder,
  private service:UserService,
  private router:Router,
  private helper:HelperService){

}
ngOnInit(): void {
  this.changePasswordForm=this.fb.group({
    password:['',[Validators.required,Validators.pattern('^[\\S]{3,}$')]],
    confirmPassword:['',[Validators.required]]
  })
}


get formControls(){
  return this.changePasswordForm.controls
}


onsubmit(){
  this.isSubmitted=true

  if (this.changePasswordForm.valid) {
    const data=this.changePasswordForm.value
    this.service.changePassword(data).subscribe((res)=>{
      if (res.success) {
        this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
          this.router.navigate(['login'])

          const message=res.message
          this.helper.showToaster(message,res.success)

        })

      }
      else{

        const message=res.message
        this.helper.showToaster(message,res.success)

      }
    })
    
  }

}


}
