import {Component, Inject, OnInit} from 'angular2/core';
import {Observable, Observer} from 'rxjs';

import {ChatMessageComponent} from './chat-message.component';
import {Message} from '../../model/chat/message';

import {APP_STATE, DISPATCHER, AppState} from '../../state/state';
import {Action, SendMessage} from '../../state/actions';

import {ChatService} from '../../services/chat/chat.service';

@Component({
  selector: 'chat',
  directives: [ChatMessageComponent],
  template: `
    <div class="chat">
      <div class="chat-history">
        <ul>
          <chat-message *ngFor="#message of messages|async" [message]="message"></chat-message>
        </ul>
      </div>
      <div class="chat-controls">
        <textarea
          class="chat-controls__textarea"
          rows="3"
          placeholder="Type your message"
          [(ngModel)]="message">
        </textarea>

        <div class="btns-row">
          <a class="chat-controls__btn" (click)="sendMessage()">Send</a>
        </div>
      </div>
    </div>
  `
})
export class ChatComponent implements OnInit {
  public message: string;

  constructor(
    @Inject(APP_STATE) private _state: Observable<AppState>,
    @Inject(DISPATCHER) private _dispatcher: Observer<Action>,
    private chatService: ChatService) {
  }

  public ngOnInit(): void {
    this.chatService.joinRoom();
  }

  public sendMessage() {
    const message = {
      userId: 'test',
      time: new Date(),
      message: this.message
    };
    this._dispatcher.next(new SendMessage(message));
    this.message = '';
    this.chatService.sendMessage(message);
  }

  public get messages(): Observable<Array<Message>> {
    return this._state.map(appState => appState.chat.messages);
  }
}