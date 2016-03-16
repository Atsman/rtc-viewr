import {Component, Inject} from 'angular2/core';
import {Store} from 'redux';
import {AppStore} from '../redux/AppStore';
import {SidebarState} from '../redux/Sidebar';
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
    private store: AppStore
    ) {
    store.getSidebarState().subscribe((sidebar: SidebarState) => {
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
