import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';
import { ActivatedRoute } from '@angular/router';
import { PaymentDetailsComponent } from '../payment-details/payment-details.component';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-view-job-profile',
  templateUrl: './view-job-profile.component.html',
  styleUrls: ['./view-job-profile.component.css']
})
export class ViewJobProfileComponent {


  //variable declarations

  jobProfileresponse: i_authRes | null = null
  createJobProfile: boolean = false
  stars: number[] = []
  jobProfileDetails:i_jobProfile|null=null
  labour_id!: string

  constructor(private matDialog: MatDialog,
    private service: UserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.labour_id=this.route.snapshot.paramMap.get('labour_id')! 

    this.service.getLabourProfile(this.labour_id).subscribe(res=>{
      if (res.success) {
        this.jobProfileDetails=res
      }
    })
  }

  openPayment(){
    this.matDialog.open(PaymentDetailsComponent,{
      data:this.jobProfileDetails,
      disableClose:true
    
    })
  }

  createChatRoom(){
    
  }



}


