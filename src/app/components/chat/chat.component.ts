import {Component, Inject} from 'angular2/core';
import {Observable, Observer} from 'rxjs';

import {ChatMessageComponent} from './chat-message.component';
import {Message} from '../../model/chat/message';

import {state, dispatcher, AppState} from '../../state/state';
import {Action, SendMessage} from '../../state/actions';

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
export class ChatComponent {
  public message: string;

  constructor(
    @Inject(state) private _state: Observable<AppState>,
    @Inject(dispatcher) private _dispatcher: Observer<Action>) {
  }

  public sendMessage() {
    this._dispatcher.next(new SendMessage({
      userId: 'test',
      time: new Date(),
      message: this.message
    }));
    this.message = '';
  }

  public get messages() {
    return this._state.map(appState => appState.chat.messages);
  }
}
