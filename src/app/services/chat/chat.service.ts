import {Injectable, Inject} from 'angular2/core';
import {APP_STATE, DISPATCHER, AppState} from '../../state/state';
import {Action, SendMessage} from '../../state/actions';
import {Observable, Observer} from 'rxjs';
import {Logger} from '../logger.service';
import {AppSocket} from './app.socket';
import {APP_CONFIG, Config} from '../../app.config';
import {Message} from '../../model/chat/Message';

@Injectable()
export class ChatService {
  constructor(
    @Inject(APP_STATE) private _state: Observable<AppState>,
    @Inject(DISPATCHER) private _dispatcher: Observer<Action>,
    private socket: AppSocket,
    private logger: Logger
  ) {
    this.socket.receivedMessages.subscribe((message: Message) => {
      this._dispatcher.next(new SendMessage(message));
    });
  }

  public sendMessage(message: Message): void {
    this.socket.sendMessage(message);
  }

  public joinRoom(): void {
    this._state
      .map((appState: AppState) => appState.interview.id)
      .subscribe((roomId: string) => {
      this.socket.joinRoom(roomId);
    });
  }
}
