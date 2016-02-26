import {Component, Inject} from 'angular2/core';
import {Store} from 'redux';
import {APP_STATE} from '../redux/Constants';
import {ChatComponent} from './chat/chat.component';
import {CodeSharing} from './code-sharing.component';

@Component({
  selector: 'sidebar',
  directives: [ChatComponent, CodeSharing],
  template: `
    <div class="sidebar" [class.active]="isActive()">
      <chat [class.hidden]="isChatHidden()"></chat>
      <code-sharing [class.hidden]="isCodeSharingHidden()"></code-sharing>
    </div>
  `
})
export class SidebarComponent {
  private _active: string;

  constructor(
    @Inject(APP_STATE) private store: Store
    ) {
    store.subscribe(() => {
      const {sidebar} = store.getState();
      this._active = sidebar.active;
    });
  }

  public isActive(): boolean {
    return this._active && this._active !== '';
  }

  public isChatActive(): boolean {
    return this._active === 'chat';
  }

  public isChatHidden(): boolean {
    return !this.isChatActive();
  }

  public isCodeSharingActive(): boolean {
    return this._active === 'code-sharing';
  }

  public isCodeSharingHidden(): boolean {
    return !this.isCodeSharingActive();
  }
}
