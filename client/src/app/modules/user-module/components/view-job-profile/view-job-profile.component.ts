import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/modules/user-module/userServices/user.service';
import { ChatService } from 'src/app/modules/user-module/userServices/chat.service';
import { Store } from '@ngrx/store';
import { userDataState } from 'src/app/store/user.state';
import { Subject, map, takeUntil } from 'rxjs';
import { PaymentDetailsComponent } from '../payment-details/payment-details.component';

@Component({
  selector: 'app-view-job-profile',
  templateUrl: './view-job-profile.component.html',
  styleUrls: ['./view-job-profile.component.css'],
})
export class ViewJobProfileComponent implements OnInit, OnDestroy {
  //variable declarations

  jobProfileresponse: i_authRes | null = null;
  createJobProfile: boolean = false;
  stars: number[] = [];
  jobProfileDetails: i_jobProfile | null = null;
  labour_id!: string;
  user_id!: string;
  application_id: string | null = null;
  chat: boolean = false;

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private matDialog: MatDialog,
    private _service: UserService,
    private _route: ActivatedRoute,
    private _chatServices: ChatService,
    private _store: Store<userDataState>,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // getting labour_id from route
    this.labour_id = this._route.snapshot.paramMap.get('labour_id')!;

    // getting query from route if it present for updating applicant collection in db if labour is hired (for posted jobs)
    const application_id =
      this._route.snapshot.queryParamMap.get('application_id');
    this.application_id = application_id;

    // getting userData (user_id) from store for creating chat room and all
    this._store
      .select('user')
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((data) => {
        this.user_id = data.userDatas?._id!;
      });

    // getting labour details from db
    this._service.getLabourProfile(this.labour_id).subscribe((res) => {
      if (res.success) {
        this.jobProfileDetails = res;
      }
    });
  }
  // opening payment details dialog
  openPayment() {
    this.matDialog.open(PaymentDetailsComponent, {
      data: {
        profileData: this.jobProfileDetails,
        application_id: this.application_id,
      },
      disableClose: true,
    });
  }

  createChat() {
    //sending to backend to store in db
    this._chatServices
      .createNewChatRoom(this.jobProfileDetails?.user_id!)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        if (res.success) {
          //activating chat-component
          this.chat = true;
          const queryParams={receiver:this.jobProfileDetails?.user_id}
          
          this._router.navigate(['chat'],{queryParams:queryParams});
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
