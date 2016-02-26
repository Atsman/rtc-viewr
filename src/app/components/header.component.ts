import {Observer, Observable} from 'rxjs';
import {Component, Inject} from 'angular2/core';
import {APP_STATE} from '../redux/Constants';
import {SidebarActions} from '../redux/Sidebar';
import {Store} from 'redux';

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
  constructor(
    @Inject(APP_STATE) private state: Store,
    private sidebarActions: SidebarActions
    ) {
  }

  public onChatClick(): void {
    this.state.dispatch(this.sidebarActions.showSidebar('chat'));
  }

  public onCodeSharingClick(): void {
    this.state.dispatch(this.sidebarActions.showSidebar('code-sharing'));
  }
}
