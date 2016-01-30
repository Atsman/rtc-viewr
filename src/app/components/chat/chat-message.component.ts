import {Component, Input} from 'angular2/core';
import {Message} from '../../model/chat/message';

@Component({
  selector: 'chat-message',
  template: `
    <li class="chat-item chat-item--me chat-item--other">
      <img src="{{message.userId}}" alt="" />
      <div class="message">
        <span class="message__user-name">{{message.username}}</span>
        <time class="message__time">{{message.time}}</time>
        <p class="message__text">{{message.message}}</p>
      </div>
    </li>
  `
})
export class ChatMessageComponent {
  @Input() message: Message;
}
