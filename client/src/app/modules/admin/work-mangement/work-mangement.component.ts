import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AdminJobManagementService } from 'src/app/services/adminServices/admin-job-management.service';
import { ViewHiringsComponent } from '../view-hirings/view-hirings.component';
import { SwalService } from 'src/app/services/commonServices/swal.service';
import { i_allJobs } from 'src/app/interfaces/adminInterfaces/i_allJobs';

@Component({
  selector: 'labourHive-work-mangement',
  templateUrl: './work-mangement.component.html',
  styleUrls: ['./work-mangement.component.css'],
})
export class WorkMangementComponent implements OnInit, OnDestroy {
  // variable declarations
  jobDetails: i_allJobs[] | null = null;
  filter: string = '';
  filterValue: string = '';
  page: number = 1;
  search: string = '';
  startDate:Date|null=null
  endDate:Date|null=null
  daterange:any

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _jobManagementService: AdminJobManagementService,
    private _matDialog: MatDialog,
    private _swalServices: SwalService
  ) {}

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs() {
    this._jobManagementService
      .getJobDetails(this.filterValue, this.search, this.page,this.startDate,this.endDate)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.jobDetails = res;
      });
  }

  onChangeFilter(value: string) {
    this.filter = value;
    this.filterValue =
      value === 'Completed'
        ? 'completed'
        : value === 'Upcoming'
        ? 'active'
        : '';
    this.getJobs();
  }

  searchJob() {
    this.getJobs();
  }

  onInputChange() {
    if (!this.search) {
      this.getJobs();
    }
  }

  clearDates(){
    this.startDate=null
    this.endDate=null
  }

  onDateChange(){
this.getJobs()
  }



  async changeStatus(job_id: string, status: string) {
    const confirmation = await this._swalServices.showConfirmation(
      'Change Job Status',
      'Do you want to change job status',
      'warning'
    );
    if (confirmation) {
      this._jobManagementService
        .changeJobStatus(job_id, status)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((res) => {
          if (res.success) {
            this._swalServices.showAlert('Success', res.message, 'success');
            this.jobDetails?.map((data) => {
              if (data._id === job_id) {
                data.currentStatus = 'completed';
              }
            });
          }
        });
    }
  }

  viewHirings(job_id: string) {
    this._matDialog.open(ViewHiringsComponent, {
      width: '1300px',
      data: job_id,
      disableClose: true,
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
