import { Component } from '@angular/core';
import { jobProfile } from 'src/app/store/user.actions';
import { userDataState } from 'src/app/store/user.state';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { Observable, map } from 'rxjs';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';
import { ActivatedRoute } from '@angular/router';

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
  jobProfileDetails!:i_jobProfile
  labour_id!: string

  constructor(private matDialog: MatDialog,
    private service: UserService,
    private store: Store<userDataState>,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //  this.service.getJobProfileDetails().subscribe(res => {
    //    if (res.success) {
    //      this.jobProfileresponse = res

    //      //setting job profile data to store
    //      this.store.dispatch(jobProfile({ profileDatas: res }))
    //      this.jobProfileDetails$ = this.store.select('user').pipe(map(state => {          
    //        return state.jobProfileDatas!

    //      }))
    //    }
    //    else {
    //      this.createJobProfile = true
    //    }
    //  })

    this.labour_id=this.route.snapshot.paramMap.get('labour_id')! 

    this.service.getLabourProfile(this.labour_id).subscribe(res=>{
      console.log(res,'kjhkjhkjhkjkjhhkjhkhkj');
      
      if (res.success) {
        this.jobProfileDetails=res
      }
    })


  }







}


