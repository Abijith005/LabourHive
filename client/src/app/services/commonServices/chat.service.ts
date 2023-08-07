import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _socket:Socket
  private _url=environment.API_URL

  constructor() {
    this._socket=io(this._url)
   }
   
   joinRoom(data:any):void{
     this._socket.emit('join',data)
    }
    
    sendMessage(data:any):void{
      this._socket.emit('message',data)
    }
  }
