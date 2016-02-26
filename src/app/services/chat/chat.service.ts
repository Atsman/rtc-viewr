import {Injectable, Inject} from 'angular2/core';
import {APP_STATE} from '../../redux/Constants';
import {Store} from 'redux';
import {ChatActions} from '../../redux/Chat';
import {Observable, Observer} from 'rxjs';
import {Logger} from '../logger.service';
import {AppSocket} from './app.socket';
import {APP_CONFIG, Config} from '../../app.config';
import {Message} from '../../model/chat/Message';

@Injectable()
export class ChatService {
  private roomId: string;

  constructor(
    @Inject(APP_STATE) private _state: Store,
    private chatActions: ChatActions,
    private socket: AppSocket,
    private logger: Logger
  ) {
    this.socket.receivedMessages.subscribe((message: Message) => {
      this._state.dispatch(this.chatActions.sendMessage(message));
    });
    this._state.subscribe(() => {
      const { interview } = this._state.getState();
      if (this.roomId && this.roomId !== interview.roomId) {
        this.socket.leaveRoom(this.roomId);
        this.roomId = interview.roomId;
      }
    });
  }

  public sendMessage(message: Message): void {
    this.socket.sendMessage(message);
  }

  public joinRoom(): void {
    this.socket.joinRoom(this.roomId);
  }
}
