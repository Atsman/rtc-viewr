import * as io from 'socket.io-client';
import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {Message} from '../../model/chat/Message';

const SOCKET_ACTIONS = {
  JOIN_ROOM: 'joinRoom',
  SEND_MESSAGE: 'sendMessage'
};

const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect'
};

/**
 * Create to have abstraction from socket io.
 */
export class ChatSocket {
  private socket: SocketIOClient.Socket;
  private _receivedMessages: Observable<Message>;

  constructor(private url: string) {
    if(_.isEmpty(url)) {
      throw 'Url is requored to create ChatSocket';
    }
    this.init();
  }

  public init() {
    this.socket = io(this.url);
    this.socket.on(SOCKET_EVENTS.CONNECT, () => {
      console.log('Socket connected');
    });
    this.socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log('Socket disconnect');
    });
    this._receivedMessages = Observable
      .fromEvent(this.socket, 'newMessage');
  }

  public get receivedMessages(): Observable<Message> {
    return this._receivedMessages;
  }

  public joinRoom(roomId: string): void {
    this.socket.emit(SOCKET_ACTIONS.JOIN_ROOM, roomId);
  }

  public sendMessage(message: Message): void {
    this.socket.emit(SOCKET_ACTIONS.SEND_MESSAGE, message);
  }
}