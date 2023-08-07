import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _socket = io(environment.API_URL)

  constructor(private _http: HttpClient) { }

  joinRoom(data: any) {
    this._socket.emit('join', data)
  }

  sendMessage(data: any) {
    this._socket.emit('message',data)

  }

  newMessageReceived(){
   let observable=new Observable<{user:string,message:string}>(observer=>{
    this._socket.on('new message',(data)=>{
      console.log('new message cs',data);
      
      observer.next(data)
    })
    return ()=>{this._socket.disconnect();} 
   })
   return observable
  }


  createNewChatRoom(data: string) {

    return this._http.post(`/createNewChatRoom`, { receiver_id: data })
  }

}
