import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password-otp',
  templateUrl: './forgot-password-otp.component.html',
  styleUrls: ['./forgot-password-otp.component.css']
})
export class ForgotPasswordOtpComponent {
  text1:string=''
  text2:string=''
  text3:string=''
  text4:string=''
  otpVerified=false

constructor(private service:UserService,
  private helper:HelperService){}


  onSubmit(formData:NgForm){
    console.log('submitted');
    if (formData.valid) {
      const otp=formData.value.text1+formData.value.text2+formData.value.text3+formData.value.text4
      this.service.submitForgotPasswordOtp(otp).subscribe((res)=>{
        if (res.success) {
          this.otpVerified=true
        }
        else{

          const title='Failed'
          const message=res.message
          const layout= DialogLayoutDisplay.DANGER
          this.helper.showToaster(title,message,layout)

        }
      })
    }


  }

  move(event:any,previous:any,current:any,next:any){
    
    const length=current.value.length
    const maxLength=current.getAttribute('maxLength')
    if (length==maxLength) {
      if (next) {
        next.focus()
      }
    }
    if (event.key=='Backspace') {
      if(previous){
        previous.focus()
      }
    }
  }

}
