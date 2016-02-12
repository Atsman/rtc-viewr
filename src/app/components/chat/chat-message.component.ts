import {Component, Input, Inject} from 'angular2/core';
import {Message} from '../../model/chat/message';
import {APP_STATE, DISPATCHER, AppState} from '../../state/state';
import {Observable} from 'rxjs';
import {User} from '../../model/user';

@Component({
  selector: 'chat-message',
  template: `
    <li class="chat-item chat-item--me chat-item--other">
      <img src="{{getUserImage()|async}}" alt="" />
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

  private me: Observable<User>;

  constructor(@Inject(APP_STATE) private appState: Observable<AppState>) {
    this.me = appState.map(({user}) => user.users[user.me]);
  }

  public getUserImage() {
    const self = this;
    return this.appState.map(state => {
      const user = state.user.users[self.message.userId];
      if(user) {
        return self.externalize(user.imageId);
      }
      return '';
    });
  }

  public externalize(imageId: string) {
    return `http://localhost:3000/api/v1/images/${imageId}`;
  }
}
