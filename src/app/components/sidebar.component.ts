import {Component, Inject} from 'angular2/core';
import {Observable} from 'rxjs';
import {state, dispatcher, AppState} from '../state/state';
import {ChatComponent} from './chat/chat.component';

@Component({
  selector: 'sidebar',
  directives: [ChatComponent],
  template: `
    <div class="sidebar" [class.active]="isActive|async">
      <chat></chat>
    </div>
  `
})
export class SidebarComponent {
  constructor(@Inject(state) private _state: Observable<AppState>) {
  }

  public get isActive() {
    return this._state.map(appState => !appState.sidebar.hidden);
  }
}
