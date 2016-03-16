import {Injectable, Inject} from 'angular2/core';
import {AppStore} from '../redux/AppStore';
import {Store} from 'redux';
import {ChatActions} from '../redux/Chat';
import {Observable, Observer} from 'rxjs';
import {AppSocket} from './app.socket.ts';
import {APP_CONFIG, Config} from '../app.config.ts';
import {Message} from '../model/chat/message';

@Injectable()
export class ChatService {
  private unsubscribe: Function;
  private roomId: string;

  constructor(
    private _state: AppStore,
    private chatActions: ChatActions,
    private socket: AppSocket
  ) {
  }

  public initialize() {
    this._state.getInterviewState().subscribe((interviewState) => {
      const newRoomId = interviewState.roomId;
      if(this.roomId !== newRoomId) {
        if(this.roomId) {
          this.socket.leaveRoom(this.roomId);
        }
        this.roomId = newRoomId;
        this.joinRoom();
      }
    });

    this.socket.receivedMessages.subscribe((message: Message) => {
      console.log(message);
      const userState = this._state.getCurrentState().user;
      if(userState.me !== message.userId) {
        this._state.dispatch(this.chatActions.sendMessage(message));
      }
    });
  }

  public sendMessage(message: Message): void {
    this.socket.sendMessage(message);
  }

  public joinRoom(): void {
    console.log('joinRoom, roomId: ' + this.roomId);
    this.socket.joinRoom(this.roomId);
  }
}
