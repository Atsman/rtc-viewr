import {Component, Inject} from 'angular2/core';
import {Observable} from 'rxjs';
import {APP_STATE, DISPATCHER, AppState} from '../state/state';
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
  constructor(@Inject(APP_STATE) private _state: Observable<AppState>) {
  }

  public get isActive(): Observable<boolean> {
    return this._state.map((appState: AppState) => appState.sidebar.active);
  }
}
