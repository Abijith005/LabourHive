import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AdminHireManagementService } from 'src/app/services/adminServices/admin-hire-management.service';
import { AdminJobManagementService } from 'src/app/services/adminServices/admin-job-management.service';
import { SwalService } from 'src/app/services/commonServices/swal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complaint-management',
  templateUrl: './complaint-management.component.html',
  styleUrls: ['./complaint-management.component.css'],
})
export class ComplaintManagementComponent implements OnInit,OnDestroy {
  // variable declarations
  complaintDatas:any

  private _unsubscribe$=new Subject<void>()

  constructor(private _hireService:AdminHireManagementService,
    private _jobServices:AdminJobManagementService,
    private _swalService:SwalService) {
  }

  ngOnInit(): void {
this._hireService.getComplaints().subscribe(res=>{
this.complaintDatas=res
})
  }

  showComplaint(complaint:string){
Swal.fire(complaint)
  }

  holdPayment(hire_id:string,payment:boolean,labour_id:string,amount:number){
this._jobServices.updatePayment(hire_id, payment, labour_id, amount).pipe(takeUntil(this._unsubscribe$)).subscribe(res=>{
  if (res.success) {
    
  }
  const title = res.success ? 'success' : 'error';
  this._swalService.showAlert(title, res.message, title);
})
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }
}
