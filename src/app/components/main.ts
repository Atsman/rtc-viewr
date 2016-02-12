import {Component, AfterViewInit, Inject} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Observable, Observer} from 'rxjs';

import {APP_STATE, DISPATCHER, AppState} from '../state/state';
import {Action, ChangeInterviewId, LoadUser, GetMe} from '../state/actions';

import {HeaderComponent} from './header.component';
import {VideoSectionComponent} from './video-section.component.ts';
import {SidebarComponent} from './sidebar.component';
import {ToolbarManager} from './toolbarManager';

@Component({
  selector: 'main',
  directives: [HeaderComponent, VideoSectionComponent, SidebarComponent],
  template: `
    <main class="main" [class.sidebar-active]="isSidebarActive|async">
      <header-component></header-component>
      <video-section></video-section>
    </main>
    <sidebar></sidebar>
  `
})
export class MainComponent implements AfterViewInit {
  constructor(
    private _routeParams: RouteParams,
    @Inject(APP_STATE) private state: Observable<AppState>,
    @Inject(DISPATCHER) private _dispatcher: Observer<Action>) {
    const interviewId = _routeParams.get('interviewId');
    this._dispatcher.next(new ChangeInterviewId(interviewId));
    this._dispatcher.next(new GetMe());
  }

  public ngAfterViewInit(): void {
    const toolbar = document.querySelector('.header');
    const controls = document.querySelector('.controls');
    if(toolbar && controls) {
      new ToolbarManager(window, toolbar, controls);
    }
  }

  get isSidebarActive() {
    return this.state.map(appState => appState.sidebar.active);
  }
};
