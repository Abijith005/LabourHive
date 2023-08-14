import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { environment } from 'src/app/environments/environment';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';
import { i_chatReceiver } from 'src/app/interfaces/userInterfaces/i_chatReceivers';

interface activeUsers {
  sender_id: string;
  receiver_id: string;
}
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _socket = io(environment.API_URL);

  constructor(private _http: HttpClient) {}

  //to socket.io

  //creating acive userlist when a user open chatting to get live messages
  joinChat(newUserId: string) {

    this._socket.emit('join', newUserId);
  }

  //send messages to socket.io for emitting to receiver
  sendMessage(data: any) {
    this._socket.emit('send-message', data);
  }

  //receiving messages from socket.io to show user
  newMessageReceived() {
    let observable = new Observable<{ user: string; message: string }>(
      (observer) => {
        this._socket.on('receive-message', (data) => {
          console.log('new message cs', data);
          observer.next(data);
        });
        return () => {
          this._socket.disconnect();
        };
      }
    );
    return observable;
  }

  //disconnect user
disconnect(){
  this._socket.emit('disconnectUser')
}
  //to database

  //adding member_id to db
  createNewChatRoom(data: string) {

    return this._http.post<i_authRes>(`/chat/createNewChatRoom`, { receiver_id: data });
  }

  //storeMessages in db

  storeSendMessages(data: any) {
    return this._http.post('/chat/storeMessages', data);
  }

  getAllmessageReceivers(user_id: string) {
    return this._http.get<i_chatReceiver[]>(`/chat/getAllReceivers/${user_id}`);
  }

  getAllMessages(room_id: string) {
    return this._http.get<any>(`/chat/getAllMessages/${room_id}`);
  }
}
