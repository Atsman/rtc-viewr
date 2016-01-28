import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject';

import {OpaqueToken, provide, Inject} from 'angular2/core';
import {Action, ShowSidebarAction} from './actions';

export interface AppState {
  sidebar: {
    hidden: boolean;
  };
}

const INITIAL_STATE: AppState = {
  sidebar: {
    hidden: true
  }
};

function stateFn(initState: AppState, actions: Observable<Action>): Observable<AppState> {
  const appStateObs: Observable<AppState> = actions.scan((state: AppState, action: Action) => {
    if(typeof state === 'undefined') {
      return INITIAL_STATE;
    }
    if(action instanceof ShowSidebarAction) {
      return {
        sidebar: {
          hidden: false
        },
      };
    } else {
      return state;
    }
  }, initState);

  return wrapIntoBehavior(initState, appStateObs);
}

function wrapIntoBehavior(init: AppState, obs: Observable<AppState>) {
  const res: BehaviorSubject<AppState> = new BehaviorSubject(init);
  obs.subscribe((state: AppState) => res.next(state));
  return res;
}

// -- DI config
const initState = new OpaqueToken('initState');
export const dispatcher = new OpaqueToken('dispatcher');
export const state = new OpaqueToken('state');

export const stateAndDispatcher = [
  provide(initState, {useValue: INITIAL_STATE}),
  provide(dispatcher, {useValue: new Subject<Action>(null)}),
  provide(state, {useFactory: stateFn, deps: [new Inject(initState), new Inject(dispatcher)]})
];