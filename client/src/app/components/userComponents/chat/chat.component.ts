import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, takeUntil } from 'rxjs';
import { i_UserDetails } from 'src/app/interfaces/userInterfaces/i_user-details';
import { ChatService } from 'src/app/services/userServices/chat.service';
import { userDataState } from 'src/app/store/user.state';

@Component({
  selector: 'labourHive-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers:[ChatService]
})
export class ChatComponent implements OnInit {


  userDatas$:Observable<i_UserDetails>|null=null
  userName:string|null=null
  user_id:string|null=null
  messageText:string|null=null
  messageArray:Array<{user:string,message:string}>=[]
  
  constructor(private _chatService:ChatService,
    private _store:Store<userDataState>){
      
      _chatService.newMessageReceived().subscribe(data=>{
        console.log(data,'kjdfhjkfkjkjfhjkf');
        
        this.messageArray.push(data)})
      }


      ngOnInit(): void {
      this.userDatas$ =this._store.select('user').pipe(map((state)=>{
        return state.userDatas!
      }))

      this.userDatas$.subscribe((data)=>{
        this.userName=data.name,
        this.user_id=data._id

      })
      }
      


  join(){
    this._chatService.joinRoom({user:this.userName,room:this.user_id})
  }

  sendMessage(){
    console.log('send clicked',this.messageText);
    
    this._chatService.sendMessage({room:this.user_id,user:this.userName,message:this.messageText})
  }
}
