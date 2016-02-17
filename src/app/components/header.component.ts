import {Observer, Observable} from 'rxjs';
import {Component, Inject} from 'angular2/core';
import {APP_STATE, DISPATCHER, AppState} from '../state/state';
import {Action, ShowSidebarAction} from '../state/actions';


@Component({
  selector: 'header-component',
  template: `
    <header class="header">
      <div class="header-inner">
        <div class="header-title">
          <h1>Interviewr Conference</h1>
        </div>
        <div class="header-actions">
          <nav class="header-nav">
            <a class="header-nav__item">
              <i class="fa fa-paper-plane"></i>
            </a>
            <a class="header-nav__item chat-btn" (click)="onChatClick()">
              <i class="fa fa-comments"></i>
            </a>
            <a class="header-nav__item" (click)="onCodeSharingClick()">
              <i class="fa fa-code"></i>
            </a>
            <a class="header-nav__item">
              <i class="fa fa-cogs"></i>
            </a>
          </nav>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  constructor(@Inject(DISPATCHER) private dispatcher: Observer<Action>,
              @Inject(APP_STATE) private state: Observable<AppState>) {
  }

  public onChatClick(): void {
    this.dispatcher.next(new ShowSidebarAction('chat'));
  }

  public onCodeSharingClick(): void {
    this.dispatcher.next(new ShowSidebarAction('code-sharing'));
  }
}
