import {Injectable, Inject} from 'angular2/core';
import * as io from 'socket.io-client';
import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {Message} from '../../model/chat/Message';
import {APP_CONFIG, Config} from '../../app.config';

const SOCKET_ACTIONS = {
  JOIN_ROOM: 'joinRoom',
  SEND_MESSAGE: 'sendMessage',
  NEW_MESSAGE: 'newMessage',
  SEND_CODE: 'sendCode',
  RECEIVE_CODE_CHANGE: 'receiveCodeChange'
};

const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
};

/**
 * Create to have abstraction from socket io.
 */
@Injectable()
export class AppSocket {
  private socket: SocketIOClient.Socket;
  private _receivedMessages: Observable<Message>;
  private _receivedCode: Observable<string>;
  private url: string;

  constructor(@Inject(APP_CONFIG) config: Config) {
    this.url = config.chatSocketUrl;
    if(_.isEmpty(this.url)) {
      throw new Error('Url is requored to create ChatSocket');
    }
    this.init();
  }

  public init() {
    this.socket = io(this.url);
    this.socket.on(SOCKET_EVENTS.CONNECT, () => console.log('Socket connected'));
    this.socket.on(SOCKET_EVENTS.DISCONNECT, () => console.log('Socket disconnect'));

    this._receivedMessages = Observable.fromEvent(this.socket, SOCKET_ACTIONS.NEW_MESSAGE);
    this._receivedCode = Observable.fromEvent(this.socket, SOCKET_ACTIONS.RECEIVE_CODE_CHANGE);
  }

  public get receivedMessages(): Observable<Message> {
    return this._receivedMessages;
  }

  public get receivedCode(): Observable<string> {
    return this._receivedCode;
  }

  public joinRoom(roomId: string): void {
    this.socket.emit(SOCKET_ACTIONS.JOIN_ROOM, roomId);
  }

  public sendMessage(message: Message): void {
    this.socket.emit(SOCKET_ACTIONS.SEND_MESSAGE, message);
  }

  public sendCode(code: string): void {
    this.socket.emit(SOCKET_ACTIONS.SEND_CODE, code);
  }
}
