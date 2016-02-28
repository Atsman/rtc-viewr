import {Injectable, Inject} from 'angular2/core';
import {APP_STATE} from '../redux/Constants';
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
    @Inject(APP_STATE) private _state: Store,
    private chatActions: ChatActions,
    private socket: AppSocket
  ) {
  }

  public initialize() {
    this.socket.receivedMessages.subscribe((message: Message) => {
      if(this._state.getState().user.me !== message.userId) {
        this._state.dispatch(this.chatActions.sendMessage(message));
      }
    });
    this.unsubscribe = this._state.subscribe(() => {
      const { interview } = this._state.getState();
      if (this.roomId && this.roomId !== interview.roomId) {
        this.socket.leaveRoom(this.roomId);
        this.roomId = interview.roomId;
      }
    });
  }

  public destroy() {
    if(this.unsubscribe) {
      this.unsubscribe();
    }
  }

  public sendMessage(message: Message): void {
    this.socket.sendMessage(message);
  }

  public joinRoom(): void {
    console.log('joinRoom!');
    this.socket.joinRoom(this.roomId);
  }
}
