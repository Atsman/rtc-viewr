import {Component, AfterViewInit, Inject, OnDestroy} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Observable, Observer} from 'rxjs';

import {APP_STATE} from '../redux/Constants';
import {Store} from 'redux';
import {InterviewActions} from '../redux/Interview';
import {UserActions} from '../redux/User';

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
export class MainComponent implements AfterViewInit, OnDestroy {

  private _isSidebarActive: boolean;
  private unsubscribe: Function;

  constructor(
    private _routeParams: RouteParams,
    private interviewActions: InterviewActions,
    private userActions: UserActions,
    @Inject(APP_STATE) private state: Store) {
    const interviewId = _routeParams.get('interviewId');

    this.state.dispatch(interviewActions.changeRoom(interviewId));
    userActions.getMe();
    this.unsubscribe = this.state.subscribe(() => {
      this._isSidebarActive = !!this.state.getState().sidebar.active;
    })
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

  public ngOnDestroy() {
      this.unsubscribe();
  }
};
