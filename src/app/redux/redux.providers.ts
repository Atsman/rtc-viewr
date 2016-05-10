import {provide, OpaqueToken} from 'angular2/core';
import {reduxStore, AppStore} from './AppStore';
import {SidebarActions} from './Sidebar';
import {ChatActions} from './Chat';
import {InterviewActions} from './Interview';
import {UserActions} from './User';
import {CodeSharingActions} from './CodeSharing';
import {APP_STATE} from './Constants';

export const reduxProviders = [
  provide(APP_STATE, { useValue: reduxStore }),
  AppStore,
  SidebarActions,
  ChatActions,
  InterviewActions,
  UserActions,
  CodeSharingActions
];