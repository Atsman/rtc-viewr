import {Observer, Observable} from 'rxjs';
import {Component, Inject} from 'angular2/core';
import {state, dispatcher, Action, AppState, ShowSidebarAction} from '../state/state';

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
            <a href="#" class="header-nav__item">
              <i class="fa fa-paper-plane"></i>
            </a>
            <a href="#" class="header-nav__item chat-btn" (click)="onChatClick()">
              <i class="fa fa-comments"></i>
            </a>
            <a href="#" class="header-nav__item">
              <i class="fa fa-code"></i>
            </a>
            <a href="#" class="header-nav__item">
              <i class="fa fa-cogs"></i>
            </a>
          </nav>
          {{sideBar|async}}
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  constructor(@Inject(dispatcher) private dispatcher: Observer<Action>,
              @Inject(state) private state: Observable<AppState>) {
  }

  public onChatClick(): any {
    this.dispatcher.next(new ShowSidebarAction());
    this.state.map((appState: AppState) => console.log(appState));
  }

  public get sideBar() {
    return this.state.map(appState => JSON.stringify(appState.sidebar));
  }

}