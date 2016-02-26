import {Component, Inject, OnInit, OnDestroy} from 'angular2/core';
import {Observable, Observer} from 'rxjs';
import {Store} from 'redux';

import {ChatMessageComponent} from './chat-message.component';
import {Message} from '../../model/chat/message';

import {APP_STATE} from '../../redux/Constants';
import {ChatActions} from '../../redux/Chat';

import {ChatService} from '../../services/chat/chat.service';
import {User} from '../../model/user';

@Component({
  selector: 'chat',
  directives: [ChatMessageComponent],
  template: `
    <div class="chat">
      <div class="chat-history">
        <ul>
          <chat-message *ngFor="#message of messages" [message]="message"></chat-message>
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
export class ChatComponent implements OnInit, OnDestroy {
  public message: string;
  public messages: Array<Message>;
  private me: User;
  private unsubscribe: Function;

  constructor(
    @Inject(APP_STATE) private _state: Store,
    private chatActions: ChatActions,
    private chatService: ChatService) {
    this.unsubscribe = _state.subscribe(() => {
      const {user, chat} = this._state.getState();
      this.me = user.users[user.me];
      this.messages = chat.messages;
    });
  }

  public ngOnInit(): void {
    this.chatService.joinRoom();
  }

  public sendMessage() {
    const message = {
      userId: this.me._id,
      time: new Date(),
      message: this.message
    };
    this._state.dispatch(this.chatActions.sendMessage(message));
    this.message = '';
    this.chatService.sendMessage(message);
  }

  public ngOnDestroy() {
    this.unsubscribe();
  }
}
