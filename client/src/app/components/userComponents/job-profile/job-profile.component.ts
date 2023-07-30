import { Component, OnInit } from '@angular/core';
import { CreatejobProfileComponent } from '../createjob-profile/createjob-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';
import { EditJobProfileComponent } from '../edit-job-profile/edit-job-profile.component';

@Component({
  selector: 'labourHive-job-profile',
  templateUrl: './job-profile.component.html',
  styleUrls: ['./job-profile.component.css']
})
export class JobProfileComponent implements OnInit {

  //variable declarations

  jobProfileDetails: i_jobProfile & i_authRes | null = null
  createJobProfile: boolean = false
  stars: number[] = []

  constructor(private matDialog: MatDialog,
    private service: UserService) { }

  ngOnInit(): void {
    this.service.getJobProfileDetails().subscribe(res => {
      if (res.success) {
        this.jobProfileDetails = res

        //getting an array for printing stars

        let rating = res.rating!
        for (let i = 0; i < 5; i++) {
          if (rating >= 1) {
            this.stars.push(1)
            rating--
          }
          else if (rating < 1 && rating > 0) {
            this.stars.push(0.5)
            rating--
          }
          else {
            this.stars.push(0)
            rating--
          }
        }
        


      }
      else {
        this.createJobProfile = true

      }

    })

  }


  //create job Profile modal activating
  openDialogCreateJobProfile() {

    this.matDialog.open(CreatejobProfileComponent, {
      width: '450px',
      height: '900px',
      disableClose: true
    })
  }

  oppenDialogEditJobProfile(){
    this.matDialog.open(EditJobProfileComponent,{
      width: '450px',
      height: '900px',
      disableClose: true,
      data:this.jobProfileDetails
    })

    
  }










}
