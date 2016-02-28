import {Component, Input, Inject, OnDestroy, OnInit} from 'angular2/core';
import {Message} from '../../model/chat/message';
import {APP_STATE} from '../../redux/Constants';
import {AppStore} from '../../redux/AppStore';
import {Observable} from 'rxjs';
import {Store} from 'redux';
import {User} from '../../model/user';
import {Externalizer} from '../../services/externalizer';

@Component({
  selector: 'chat-message',
  template: `
    <li class="chat-item" [ngClass]="{
      'chat-item--me': isSendByMe(),
      'chat-item--other': isSendByOther()
    }">
      <img src="{{getUserImage()}}" alt="" />
      <div class="message">
        <span class="message__user-name">{{message.username}}</span>
        <time class="message__time">{{message.time}}</time>
        <p class="message__text">{{message.message}}</p>
      </div>
    </li>
  `
})
export class ChatMessageComponent {
  @Input() public message: Message;
  @Input() public me: User;
  @Input() public users: Object;

  constructor(
    private externalizer: Externalizer
  ) {
  }

  public getUserImage() {
    const user = this.users[this.message.userId];
    if(user) {
      return this.externalize(user.imageId);
    }
    return '';
  }

  public isSendByMe() {
    if(this.me) {
      return this.me._id === this.message.userId;
    }
  }

  public isSendByOther() {
    return !this.isSendByMe();
  }

  public externalize(imageId: string) {
    return this.externalizer.apiUrl(`images/${imageId}`);
  }
}
