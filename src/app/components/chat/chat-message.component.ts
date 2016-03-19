import {Component, Input} from 'angular2/core';
import {Message} from '../../model/chat/message';
import {AppStore} from '../../redux/AppStore';
import {Observable} from 'rxjs';
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
        <time class="message__time">
          <i class="fa fa-clock-o"></i>
          {{message.time}}
        </time>
        <p class="message__text">{{message.message}}</p>
      </div>
    </li>
  `
})
export class ChatMessageComponent {
  @Input() public message: Message;
  @Input() public me: User;

  constructor(
    private externalizer: Externalizer
  ) {
  }

  public getUserImage() {
    return this.externalize(this.message.userImage);
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
