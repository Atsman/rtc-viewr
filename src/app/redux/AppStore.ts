import {Injectable} from 'angular2/core';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Observable, BehaviorSubject} from 'rxjs';
import {sidebar, SidebarState} from './Sidebar';
import {chat, ChatState} from './Chat';
import {interview, InterviewState} from './Interview';
import {user, UserState} from './User';
import {codeSharing, CodeSharingState} from './CodeSharing';
import {User} from '../model/user';

const thunk = require('redux-thunk');
const createLogger: any = require('redux-logger');

const appReducer = combineReducers({
  sidebar,
  chat,
  interview,
  user,
  codeSharing
});

const logger = createLogger();

export const reduxStore = createStore(
  appReducer,
  applyMiddleware(thunk, logger)
);

interface AppState {
  chat: ChatState;
  user: UserState;
  sidebar: SidebarState;
  interview: InterviewState;
  codeSharing: CodeSharingState;
}

@Injectable()
export class AppStore {
  private state: BehaviorSubject<AppState>;

  constructor() {
    this.state = new BehaviorSubject(reduxStore.getState());
    const unsubscribe = reduxStore.subscribe(() => {
      this.state.next(reduxStore.getState());
    });
  }

  public dispatch(action) {
    reduxStore.dispatch(action);
  }

  public getCurrentState(): AppState {
    return reduxStore.getState();
  }

  public getMe(): User {
    const user = this.getCurrentState().user;
    return user.users[user.me];
  }

  public getState(): BehaviorSubject<AppState> {
    return this.state;
  }

  public getUserState(): Observable<UserState> {
    return this.state.map(({user}) => user);
  }

  public getChatState(): Observable<ChatState> {
    return this.state.map(({chat}) => chat);
  }

  public getCodeSharingState(): Observable<CodeSharingState> {
    return this.state.map(({codeSharing}) => codeSharing);
  }

  public getSidebarState(): Observable<SidebarState> {
    return this.state.map(({sidebar}) => sidebar);
  }

  public getInterviewState(): Observable<InterviewState> {
    return this.state.map(({interview}) => interview);
  }

}
