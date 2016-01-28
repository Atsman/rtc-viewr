import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject';

import {OpaqueToken, provide, Inject} from 'angular2/core';
import {Action, ShowSidebarAction} from './actions';

interface SidebarState {
  hidden: boolean;
}

interface ChatState {
}

export interface AppState {
  sidebar: SidebarState;
  chat: ChatState;
}

const INITIAL_STATE: AppState = {
  sidebar: {
    hidden: true
  },
  chat: {
  }
};

interface StateHandler<T> {
  (initState: T, actions: Observable<Action>) : Observable<T>;
}

const sidebarStateHandler: StateHandler<SidebarState> = (initState, actions) => {
  return actions.scan((state, action) => {
    if(action instanceof ShowSidebarAction) {
      return {
        hidden: false
      };
    } else {
      return state;
    }
  }, initState);
};

const chatStateHandler: StateHandler<ChatState> = (initState, actions) => {
  return actions.scan((state, action) => {
    return state;
  }, initState);
};

function stateFn(initState: AppState, actions: Observable<Action>): Observable<AppState> {
  const combine = s => ({sidebar: s[0]});

  const appStateObs: Observable<AppState> = sidebarStateHandler(initState.sidebar, actions)
    .zip(chatStateHandler(initState.chat, actions)).map(combine);//todo: change to reduce.

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

function dispatcherFactory() {
  const dispatcher = new Subject<Action>();
  dispatcher.subscribe((value: Action) => console.log(value));
  return dispatcher;
}

export const stateAndDispatcher = [
  provide(initState, {useValue: INITIAL_STATE}),
  provide(dispatcher, {useFactory: dispatcherFactory}),
  provide(state, {useFactory: stateFn, deps: [new Inject(initState), new Inject(dispatcher)]})
];