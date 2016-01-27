import {Observable, Observer} from 'rxjs';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject';

import {Component, OpaqueToken, provide, Inject, Input, Output, EventEmitter, enableProdMode} from 'angular2/core';

interface SidebarState {
  hidden: boolean;
}

export interface AppState {
  sidebar: SidebarState;
}

export class ShowSidebarAction {}

export type Action = ShowSidebarAction;

function stateFn(initState: AppState, actions: Observable<Action>): Observable<AppState> {
  const appStateObs: Observable<AppState> = actions.scan((state, action) => {
    if(action instanceof ShowSidebarAction) {
      state.sidebar.hidden = false;
      return state;
    } else {
      return state;
    }
  }, initState);

  return wrapIntoBehavior(initState, appStateObs);
}

function wrapIntoBehavior(init, obs) {
  const res = new BehaviorSubject(init);
  obs.subscribe(s => res.next(s));
  return res;
}

// -- DI config
const initState = new OpaqueToken('initState');
export const dispatcher = new OpaqueToken('dispatcher');
export const state = new OpaqueToken('state');

export const stateAndDispatcher = [
  provide(initState, {useValue: {sidebar: {hidden: true}}}),
  provide(dispatcher, {useValue: new Subject<Action>(null)}),
  provide(state, {useFactory: stateFn, deps: [new Inject(initState), new Inject(dispatcher)]})
];