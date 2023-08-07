import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogLayoutDisplay} from '@costlydeveloper/ngx-awesome-popup';
import { HelperService } from 'src/app/services/commonServices/helper.service';
import { UserService } from 'src/app/services/userServices/user.service';


@Component({
  selector: 'labourHive-register-otp',
  templateUrl: './register-otp.component.html',
  styleUrls: ['./register-otp.component.css']
})
export class RegisterOtpComponent {
  text1:string=''
  text2:string=''
  text3:string=''
  text4:string=''

  @Input() userData:any

  constructor(private service:UserService,
    private router:Router,
    private helper:HelperService,
    ){}

  onSubmit(form:NgForm){
    let otp=form.value.text1+form.value.text2+form.value.text3+form.value.text4;
    

    this.service.postRegisterOtp(otp,this.userData).subscribe((res)=>{
      if (res.success) {
        this.router.navigate(['login'])

        const title='Success!!'
        const message=res.message
        const layout= DialogLayoutDisplay.SUCCESS
        this.helper.showToaster(message,res.success)

   

      }

      else{

        const message='Please re-enter OTP'
        this.helper.showToaster(message,res.success)
    
      }
      
    })

    
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
