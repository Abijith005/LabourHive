import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { i_hirings } from 'src/app/interfaces/adminInterfaces/i_hirings';
import { AdminJobManagementService } from 'src/app/services/adminServices/admin-job-management.service';
import { SwalService } from 'src/app/services/commonServices/swal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-hirings',
  templateUrl: './view-hirings.component.html',
  styleUrls: ['./view-hirings.component.css']
})
export class ViewHiringsComponent implements OnInit,OnDestroy{
  // variable declarations

  hiringDatas:i_hirings[]|null=null

  private _unsubscribe$=new Subject<void>()

constructor(
  @Inject(MAT_DIALOG_DATA) private _job_id:string,
  private _matDialogRef:MatDialogRef<ViewHiringsComponent>,
  private _jobManagement:AdminJobManagementService,
  private _swalService:SwalService
  ){}

  ngOnInit(): void {    
    this._jobManagement.getHirings(this._job_id).subscribe(res=>{      
      this.hiringDatas=res
    })
    
  }

  viewComplaint(compalint:{complaintText:string}){
    Swal.fire(compalint.complaintText)
  }
  payment(hire_id:string,payment:boolean){
    this._jobManagement.updatePayment(hire_id,payment).pipe(takeUntil(this._unsubscribe$)).subscribe(res=>{
      const title=res.success?'Success':'error'
      this._swalService.showAlert(title,res.message,title)
    })
  }

  close() {
    this._matDialogRef.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }
}
