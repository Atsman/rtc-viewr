import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject';
import * as _ from 'lodash';

import {OpaqueToken, provide, Inject} from 'angular2/core';
import {Action, ShowSidebarAction, ChangeInterviewId, SendMessage, LoadUser, UserLoaded, GetMe, MeLoaded} from './actions';
import {Message} from '../model/chat/message';
import {User} from '../model/user';
import {UserService} from '../services/user.service';
import {UserResource} from '../services/user.resource';

interface SidebarState {
  active: string;
}

interface ChatState {
  messages: Message[];
}

interface InterviewState {
  id: string;
}

interface UserState {
  me: string;
  users: {[key: string]: User};
}

interface CodeSharingState {
  text: string;
}

export interface AppState {
  interview: InterviewState;
  sidebar: SidebarState;
  chat: ChatState;
  user: UserState;
  codeSharingState: CodeSharingState
}

const INITIAL_STATE: AppState = {
  interview: {
    id: undefined
  },
  sidebar: {
    active: ''
  },
  chat: {
    messages: []
  },
  user: {
    me: undefined,
    users: {}
  },
  codeSharingState: {
    text: ''
  }
};

interface StateHandler<T> {
  (initState: T, actions: Observable<Action>) : Observable<T>;
}

interface UserStateHandler<T> {
  (initState: T, actions: Observable<Action>, userService: UserService): Observable<T>;
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
      if(state.active === action.sectionName) {
        return {
          active: ''
        };
      } else {
        return {
          active: action.sectionName
        };
      }
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

const userStateHandler: UserStateHandler<UserState> = (initState, actions, userService): Observable<UserState> => {
  return actions.scan((state: UserState, action) => {
    if(action instanceof GetMe) {
      userService.getMe();
      return state;
    } else if(action instanceof MeLoaded) {
      const newUser = action.user;
      state.me = newUser._id;
      state.users[newUser._id] = newUser;
      return <UserState> _.assign({}, state);
    } else if(action instanceof LoadUser) {
      userService.getUser(action.id);
      return state;
    } else if(action instanceof UserLoaded) {
      const newUser = action.user;
      state.users[newUser.id] = newUser;
      return <UserState> _.assign({}, state);
    } else {
      return state;
    }
  }, initState);
};

function stateFn(initState: AppState, actions: Observable<Action>, userService: UserService): Observable<AppState> {
  const combine = s => ({sidebar: s[0], chat: s[1], interview: s[2], user: s[3]});

  const appStateObs: Observable<AppState> = sidebarStateHandler(initState.sidebar, actions)
    .zip(
      chatStateHandler(initState.chat, actions),
      interviewStateHandler(initState.interview, actions),
      userStateHandler(initState.user, actions, userService))
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
export const DISPATCHER = new OpaqueToken('dispatcher');
export const APP_STATE = new OpaqueToken('state');

function dispatcherFactory() {
  const dispatcher = new Subject<Action>();
  dispatcher.subscribe((value: Action) => console.log(value));
  return dispatcher;
}

export const stateAndDispatcher = [
  provide(initState, {useValue: INITIAL_STATE}),
  provide(DISPATCHER, {useFactory: dispatcherFactory}),
  provide(UserService, {
    useFactory: function(userResource, dispatcher) {
      return new UserService(userResource, dispatcher);
    },
    deps: [UserResource, new Inject(DISPATCHER)]
  }),
  provide(APP_STATE, {useFactory: stateFn, deps: [new Inject(initState), new Inject(DISPATCHER), UserService]})
];
