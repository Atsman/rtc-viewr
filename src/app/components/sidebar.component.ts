import {Component, Inject} from 'angular2/core';
import {Observable} from 'rxjs';
import {APP_STATE, AppState} from '../state/state';
import {ChatComponent} from './chat/chat.component';
import {CodeSharing} from './code-sharing.component';

@Component({
  selector: 'sidebar',
  directives: [ChatComponent, CodeSharing],
  template: `
    <div class="sidebar" [class.active]="isActive|async">
      <chat [class.hidden]="isChatHidden|async"></chat>
      <code-sharing [class.hidden]="isCodeSharingHidden|async"></code-sharing>
    </div>
  `
})
export class SidebarComponent {
  constructor(@Inject(APP_STATE) private _state: Observable<AppState>) {
  }

  public get isActive(): Observable<boolean> {
    return this._state.map((appState: AppState) => appState.sidebar.active && appState.sidebar.active !== '');
  }

  public get isChatActive(): Observable<boolean> {
    return this._state.map((appState: AppState) => appState.sidebar.active === 'chat');
  }

  public get isChatHidden(): Observable<boolean> {
    return this.isChatActive.map((v: boolean) => !v);
  }

  public get isCodeSharingActive(): Observable<boolean> {
    return this._state.map((appState: AppState) => appState.sidebar.active === 'code-sharing');
  }

  public get isCodeSharingHidden(): Observable<boolean> {
    return this.isCodeSharingActive.map((v: boolean) => !v);
  }
}
