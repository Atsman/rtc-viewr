import {Component, Input, Inject} from 'angular2/core';
import {Message} from '../../model/chat/message';
import {APP_STATE, AppState} from '../../state/state';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {Externalizer} from '../../services/externalizer';

@Component({
  selector: 'chat-message',
  template: `
    <li class="chat-item" [ngClass]="{
      'chat-item--me': isSendByMe()|async,
      'chat-item--other': isSendByOther()|async
    }">
      <img src="{{getUserImage()|async}}" alt="" />
      <div class="message">
        <span class="message__user-name">{{message.username}}</span>
        <time class="message__time">{{message.time | date}}</time>
        <p class="message__text">{{message.message}}</p>
      </div>
    </li>
  `
})
export class ChatMessageComponent {
  @Input() public message: Message;

  private me: Observable<User>;

  constructor(
    @Inject(APP_STATE) private appState: Observable<AppState>,
    private externalizer: Externalizer
  ) {
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

  public isSendByMe() {
    const self = this;
    return this.me.map((user) => user._id === self.message.userId);
  }

  public isSendByOther() {
    return this.isSendByMe().map(v => !v);
  }

  public externalize(imageId: string) {
    return this.externalizer.apiUrl(`images/${imageId}`);
  }
}
