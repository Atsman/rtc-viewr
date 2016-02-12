import {Injectable, Inject} from 'angular2/core';
import {APP_STATE, DISPATCHER, AppState} from '../../state/state';
import {Action, SendMessage} from '../../state/actions';
import {Observable, Observer} from 'rxjs';
import {Logger} from '../logger.service';
import {ChatSocket} from './chat.socket';
import {APP_CONFIG, Config} from '../../app.config';
import {Message} from '../../model/chat/Message';

@Injectable()
export class ChatService {
  private socket: ChatSocket;

  constructor(
    @Inject(APP_STATE) private _state: Observable<AppState>,
    @Inject(DISPATCHER) private _dispatcher: Observer<Action>,
    @Inject(APP_CONFIG) config: Config,
    private logger: Logger
  ) {
    this.socket = new ChatSocket(config.chatSocketUrl);
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