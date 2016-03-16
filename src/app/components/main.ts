import {Component, AfterViewInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Observable, Observer} from 'rxjs';

import {AppStore} from '../redux/AppStore';
import {InterviewActions} from '../redux/Interview';
import {UserActions} from '../redux/User';
import {SidebarState} from '../redux/Sidebar';

import {HeaderComponent} from './header.component';
import {VideoSectionComponent} from './video-section.component.ts';
import {SidebarComponent} from './sidebar.component';
import {ToolbarManager} from './toolbarManager';

@Component({
  selector: 'main',
  directives: [HeaderComponent, VideoSectionComponent, SidebarComponent],
  template: `
    <main class="main" [class.sidebar-active]="isSidebarActive">
      <header-component></header-component>
      <video-section></video-section>
    </main>
    <sidebar></sidebar>
  `
})
export class MainComponent implements AfterViewInit {

  private _isSidebarActive: boolean;

  constructor(
    //private _routeParams: RouteParams,
    private interviewActions: InterviewActions,
    private userActions: UserActions,
    private state: AppStore) {
    userActions.getMe();
    this.state.getSidebarState().subscribe((sidebar: SidebarState) => {
      this._isSidebarActive = !!sidebar.active;
    });
  }

  public ngAfterViewInit(): void {
    const toolbar = document.querySelector('.header');
    const controls = document.querySelector('.controls');
    if(toolbar && controls) {
      new ToolbarManager(window, toolbar, controls);
    }
  }

  public get isSidebarActive() {
    return this._isSidebarActive;
  }
}
