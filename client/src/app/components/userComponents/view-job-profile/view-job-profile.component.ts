import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';
import { ActivatedRoute } from '@angular/router';
import { PaymentDetailsComponent } from '../payment-details/payment-details.component';
import { UserService } from 'src/app/services/userServices/user.service';
import { ChatService } from 'src/app/services/userServices/chat.service';
import { Store } from '@ngrx/store';
import { userDataState } from 'src/app/store/user.state';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-view-job-profile',
  templateUrl: './view-job-profile.component.html',
  styleUrls: ['./view-job-profile.component.css']
})
export class ViewJobProfileComponent implements OnInit, OnDestroy {


  //variable declarations

  jobProfileresponse: i_authRes | null = null
  createJobProfile: boolean = false
  stars: number[] = []
  jobProfileDetails: i_jobProfile | null = null
  labour_id!: string
  user_id!: string
  chat: boolean = false

  private _unsubscribe$ = new Subject<void>()

  constructor(private matDialog: MatDialog,
    private _service: UserService,
    private _route: ActivatedRoute,
    private _chatServices: ChatService,
    private _store: Store<userDataState>
  ) { }

  ngOnInit(): void {

    this.labour_id = this._route.snapshot.paramMap.get('labour_id')!

    this._store.select('user').pipe(takeUntil(this._unsubscribe$)).subscribe(data => {
      this.user_id = data.userDatas?._id!
    })




    this._service.getLabourProfile(this.labour_id).subscribe(res => {
      if (res.success) {
        this.jobProfileDetails = res
      }
    })
  }

  openPayment() {
    this.matDialog.open(PaymentDetailsComponent, {
      data: this.jobProfileDetails,
      disableClose: true

    })
  }

  createChat() {
    //sending to socket io adding to active users
    // this._chatServices.joinChat(this.user_id)

    //sending to backend to store in db
    this._chatServices.createNewChatRoom(this.jobProfileDetails?.user_id!).pipe(takeUntil(this._unsubscribe$)).subscribe(res=>{
      if (res.success) {
        console.log(res);
        
        //activating chat-component
        this.chat = true
      }
    })


  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()

  }



}


