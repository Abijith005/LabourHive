import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/userServices/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers:[ChatService]
})
export class ChatComponent {

  walletAmount:string='anandhu'
  constructor(private _chatService:ChatService){}

  join(){
    this._chatService.joinRoom({user:'abijith',room:'with kkk'})
    this.walletAmount='fabna'
  }
}
