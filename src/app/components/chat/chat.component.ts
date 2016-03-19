import {Component, Inject, OnInit} from 'angular2/core';
import {Observable, Observer} from 'rxjs';
import {Store} from 'redux';

import {ChatMessageComponent} from './chat-message.component';
import {Message} from '../../model/chat/message';

import {AppStore} from '../../redux/AppStore';
import {APP_STATE} from '../../redux/Constants';
import {ChatActions} from '../../redux/Chat';

import {ChatService} from '../../services/chat.service';
import {User} from '../../model/user';

@Component({
  selector: 'chat',
  directives: [ChatMessageComponent],
  template: `
    <div class="chat">
      <div class="chat-history">
        <ul>
          <chat-message
            *ngFor="#message of getMessages()|async"
            [message]="message" [me]="me"
            [users]="users">
          </chat-message>
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
    private store: AppStore,
    private chatActions: ChatActions,
    private chatService: ChatService) {
  }

  public ngOnInit(): void {
    this.chatService.initialize();
  }

  public getMessages() {
    return this.store.getChatState().map((chat) => chat.messages);
  }

  public sendMessage() {
    const me = this.store.getMe();
    const message = {
      userId: me._id,
      time: new Date(),
      message: this.message,
      userImage: me.imageId,
      roomId: this.store.getCurrentState().interview.roomId
    };
    this.store.dispatch(this.chatActions.sendMessage(message));
    this.message = '';
    this.chatService.sendMessage(message);
  }
}
