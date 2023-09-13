import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import {
  i_chatReceiver,
  i_messages,
} from 'src/app/interfaces/userInterfaces/i_chatReceivers';
import { i_UserDetails } from 'src/app/interfaces/userInterfaces/i_user-details';
import { ChatService } from 'src/app/modules/user-module/userServices/chat.service';
import { userDataState } from 'src/app/store/user.state';

@Component({
  selector: 'labourHive-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('messageContainer') messageContainer!: ElementRef;

  receiver_id: string|null= '';
  userDatas$: Observable<i_UserDetails> | null = null;
  userName: string | null = null;
  user_id!: string;
  messageText: string | null = null;
  messageArray: i_messages[] = [];
  messageReceivers: i_chatReceiver[] | null = null;
  currentChatPerson: i_chatReceiver | null = null;

  private _unsubscribe$ = new Subject();

  constructor(
    private _chatService: ChatService,
    private _store: Store<userDataState>,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //getting user details from store
    this.userDatas$ = this._store.select('user').pipe(
      map((state) => {
        return state.userDatas!;
      })
    );

    this.userDatas$.subscribe((data) => {
      this.user_id = data._id;
    });

    //joining on socket.io
    this._chatService.joinChat(this.user_id);

    //getting all messages of user from db.
    this._chatService
      .getAllmessageReceivers(this.user_id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.messageReceivers = res;
      });

    // newMessage observable is subscribed from chat services
    this._chatService
      .newMessageReceived()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((data) => {
        this.messageArray.push(data);
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
      });
      this.receiver_id=this._route.snapshot.queryParamMap.get('receiver')      
  }

  // scroll bottom function
  scrollToBottom() {
    if (this.messageContainer) {
      const offset = 20;
      const container = this.messageContainer.nativeElement;
      container.scrollTop = container.scrollHeight + offset;
    }
  }

  //change chat person
  chatPersonChange(receiver: i_chatReceiver) {
    this.currentChatPerson = receiver;
    this.messageArray = [];
    this._chatService
      .getAllMessages(receiver.room_id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.messageArray = res;
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
      });
  }

  sendMessage(event: Event) {
    //sending to socket.io
    if (event instanceof KeyboardEvent) {
      if (event.key != 'Enter') {
        return;
      }
    }

    if (!this.messageText?.trim()) {
      return;
    }
    const message = {
      user: 'sender',
      message: this.messageText,
    };
    Object.freeze(message);
    this.messageArray.push(message);
    this._chatService.sendMessage({
      receiver_id: this.receiver_id,
      message: this.messageText,
    });

    //store messages in db
    this._chatService
      .storeSendMessages({
        receiver_id: this.receiver_id,
        sender_id: this.user_id,
        message: this.messageText,
      })
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe();

    this.messageText = '';
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  ngOnDestroy(): void {
    this._chatService.disconnect();
    this._unsubscribe$.unsubscribe();
  }
}
