import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject';
import * as _ from 'lodash';

import {OpaqueToken, provide, Inject} from 'angular2/core';
import {Action, ShowSidebarAction, ChangeInterviewId, SendMessage} from './actions';
import {Message} from '../model/chat/message';

interface SidebarState {
  hidden: boolean;
}

interface ChatState {
  messages: Message[];
}

interface InterviewState {
  id: string;
}

export interface AppState {
  interview: InterviewState;
  sidebar: SidebarState;
  chat: ChatState;
}

const INITIAL_STATE: AppState = {
  interview: {
    id: null
  },
  sidebar: {
    hidden: true
  },
  chat: {
    messages: []
  }
};

interface StateHandler<T> {
  (initState: T, actions: Observable<Action>) : Observable<T>;
}

const interviewStateHandler: StateHandler<InterviewState> = (initState, actions) => {
  return actions.scan((state, action) => {
    if(action instanceof ChangeInterviewId) {
      return <InterviewState> _.assign({}, state, {id: action.id});
    } else {
      return state;
    }
  }, initState);
};

const sidebarStateHandler: StateHandler<SidebarState> = (initState, actions) => {
  return actions.scan((state, action) => {
    if(action instanceof ShowSidebarAction) {
      return {
        hidden: !state.hidden
      };
    } else {
      return state;
    }
  }, initState);
};

const chatStateHandler: StateHandler<ChatState> = (initState, actions) => {
  return actions.scan((state, action) => {
    if(action instanceof SendMessage) {
      state.messages = [...state.messages, action.message];
      return <ChatState> _.assign({}, state);
    } else {
      return state;
    }
  }, initState);
};

function stateFn(initState: AppState, actions: Observable<Action>): Observable<AppState> {
  const combine = s => ({sidebar: s[0], chat: s[1], interview: s[2]});

  const appStateObs: Observable<AppState> = sidebarStateHandler(initState.sidebar, actions)
    .zip(chatStateHandler(initState.chat, actions), interviewStateHandler(initState.interview, actions))
    .map(combine); // todo: change to reduce.

  return wrapIntoBehavior(initState, appStateObs);
}

function wrapIntoBehavior(init: AppState, obs: Observable<AppState>) {
  const res: BehaviorSubject<AppState> = new BehaviorSubject(init);
  obs.subscribe((state: AppState) => {
    console.log(state);
    return res.next(state);
  });
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
