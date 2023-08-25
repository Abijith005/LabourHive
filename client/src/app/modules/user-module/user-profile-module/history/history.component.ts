import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserProfileService } from '../../userServices/user-profile.service';
import { Subject, takeUntil } from 'rxjs';
import { i_userProfile } from 'src/app/interfaces/userInterfaces/userProfile';
import { JobService } from '../../userServices/job.service';
import { SwalService } from 'src/app/services/commonServices/swal.service';
import { MatDialog } from '@angular/material/dialog';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit,OnDestroy {
// variable declarations
historyData:i_userProfile[]|[]=[]

private _unsubscribe$=new Subject<void>()

constructor(private _profileService:UserProfileService,
  private _jobService:JobService,
  private _swalService:SwalService,
  private _matDialog:MatDialog){}

ngOnInit(): void {
  this._profileService.getHistory().pipe(takeUntil(this._unsubscribe$)).subscribe(res=>{
    this.historyData=res.data
    
  })
}

async cancelHire(_id:string){
  const confirmation=await this._swalService.showConfirmation('Cancel Hiring','Do you want to cancel the hiring','warning')
  if (confirmation) {
    this._jobService.cancelJob(_id).pipe(takeUntil(this._unsubscribe$)).subscribe(res=>{
      if (res.success) {
        this._swalService.showAlert('Success',res.message,'success')
      }
    
    })
  }
  else{
    return
  }
}

rateLabour(labour_id:string,hire_id:string){
this._matDialog.open(RatingComponent,{
  width:'500px',
  disableClose:true,
  data:{labour_id,hire_id}
})
}


ngOnDestroy(): void {
  this._unsubscribe$.next()
  this._unsubscribe$.complete()

}

}