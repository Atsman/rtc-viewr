import {Injectable} from 'angular2/core';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Observable} from 'rxjs';
import {sidebar, SidebarState} from './Sidebar';
import {chat, ChatState} from './Chat';
import {interview, InterviewState} from './Interview';
import {user, UserState} from './User';
import {codeSharing, CodeSharingState} from './CodeSharing';

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

export const appStore = createStore(
  appReducer,
  applyMiddleware(thunk, logger)
);

@Injectable()
export class AppStore {
  private state: Observable<any>;

  constructor() {
    this.state = Observable.create((observer) => {
      const unsubscribe = appStore.subscribe(() => {
        observer.next(appStore.getState());
        return unsubscribe;
      });
    });
  }

  public dispatch(action) {
    appStore.dispatch(action);
  }

  public getState(): Observable<any> {
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
