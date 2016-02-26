import {Component, Input, Inject, OnDestroy} from 'angular2/core';
import {Message} from '../../model/chat/message';
import {APP_STATE} from '../../redux/Constants';
import {Observable} from 'rxjs';
import {Store} from 'redux';
import {User} from '../../model/user';
import {Externalizer} from '../../services/externalizer';

@Component({
  selector: 'chat-message',
  template: `
    <li class="chat-item" [ngClass]="{
      'chat-item--me': isSendByMe()|async,
      'chat-item--other': isSendByOther()|async
    }">
      <img src="{{getUserImage()}}" alt="" />
      <div class="message">
        <span class="message__user-name">{{message.username}}</span>
        <time class="message__time">{{message.time | date}}</time>
        <p class="message__text">{{message.message}}</p>
      </div>
    </li>
  `
})
export class ChatMessageComponent implements OnDestroy {
  @Input() public message: Message;

  private me: User;
  private users: Array<User>;
  private unsubscribe: Function;

  constructor(
    @Inject(APP_STATE) private appState: Store,
    private externalizer: Externalizer
  ) {
    this.unsubscribe = appState.subscribe(() => {
      const appState = this.appState.getState();
      this.me = appState.user.users[appState.user.me];
      this.users = appState.user.users;
    })
  }

  public getUserImage() {
    const user = this.users[this.message.userId];
    if(user) {
      return this.externalize(user.imageId);
    }
    return '';
  }

  public isSendByMe() {
    return this.me._id === this.message.userId;
  }

  public isSendByOther() {
    return !this.isSendByMe();
  }

  public externalize(imageId: string) {
    return this.externalizer.apiUrl(`images/${imageId}`);
  }

  public ngOnDestroy() {
    this.unsubscribe();
  }
}
