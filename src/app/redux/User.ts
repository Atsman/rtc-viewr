import {Injectable, Inject} from 'angular2/core';
import {Action} from './Action';
import {User} from '../model/user';
import {UserResource} from '../services/user.resource';
import {APP_STATE} from './Constants';
import {Store} from 'redux';

const GET_ME = 'GET_ME';
const ME_LOADED = 'ME_LOADED';
const LOAD_USER = 'LOAD_USER';
const USER_LOADED = 'USER_LOADED';

interface MeLoadedAction extends Action {
  payload: {
    user: User
  };
}

interface GetUserAction extends Action {
  payload: {
    userId: string
  };
}

interface UserLoadedAction extends Action {
  payload: {
    user: User
  };
}

export interface UserState {
  me: string;
  users: { [key: string]: User };
}

function meLoadedReducer(state: UserState, action: MeLoadedAction): UserState {
  const me = action.payload.user;
  const nextState = Object.assign({}, state, {
    me: me._id,
  });
  return userLoadedReducer(nextState, {
    type: USER_LOADED,
    payload: {
      user: me
    }
  });
}

function userLoadedReducer(state: UserState, action: UserLoadedAction): UserState {
  const newUser = action.payload.user;
  const users = Object.assign({}, state.users, {
    [newUser._id]: newUser
  });
  return Object.assign({}, state, {
    users
  });
}

const initialState: UserState = {
  me: undefined,
  users: {}
};

export function user(state: UserState = initialState, action: Action): UserState {
  switch(action.type) {
    case ME_LOADED:
      return meLoadedReducer(state, action);
    case USER_LOADED:
      return userLoadedReducer(state, action);
    default:
      return state;
  }
}

@Injectable()
export class UserActions {
  constructor(
    private userResource: UserResource,
    @Inject(APP_STATE) private appState: Store
    ) {
  }

  getMe() {
    this.userResource.getMe().subscribe((user) => {
      this.appState.dispatch(<MeLoadedAction> {
        type: ME_LOADED,
        payload: {
          user: user
        }
      });
    }, () => {
      window.location.assign('/');
    });
  }

  getUser(id) {
    this.userResource.getOne(id).subscribe((user) => {
      this.appState.dispatch({
        type: USER_LOADED,
        payload: {
          user: user
        }
      });
    });
  }
}
