import { Injectable } from '@angular/core';
import io from 'socket.io-client'; 
import { Observable } from 'rxjs'; 
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _socket=io(environment.SOCKET_IO_URL)

  constructor() { }

  joinRoom(data:any){
    this._socket.emit('join',data)
  }
}
