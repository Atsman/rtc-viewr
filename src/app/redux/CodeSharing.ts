import {Injectable, Inject} from 'angular2/core';
import {Action} from './Action';
import {AppSocket} from '../services/app.socket.ts';
import {Store} from 'redux';
import {APP_STATE} from './Constants';

const REFRESH_CODE = 'REFRESH_CODE';
const CHANGE_LANG = 'CHANGE_LANG';

interface RefreshCodeAction extends Action {
  payload: {
    code: string
  };
}

interface ChangeLangAction extends Action {
  payload: {
    lang: string
  };
}

export interface CodeSharingState {
  lang: string;
  code: string;
  cursor: {
    column: number;
    row: number;
  };
}

export interface CodeSharingMessage extends CodeSharingState {
  roomId: string;
}

const initialState: CodeSharingState = {
  lang: 'ace/mode/javascript',
  code: '',
  cursor: {
    column: 0,
    row: 0
  }
};

export function codeSharing(state: CodeSharingState = initialState, action: Action): CodeSharingState {
  switch(action.type) {
    case REFRESH_CODE:
      return Object.assign({}, state, {
        code: action.payload.code
      });
    case CHANGE_LANG:
      return Object.assign({}, state, {
        lang: action.payload.lang
      });
    default:
      return state;
  }
}

@Injectable()
export class CodeSharingActions {
  constructor(
    @Inject(APP_STATE) private state: Store,
    private appSocket: AppSocket
  ) {
    appSocket.receivedCode.subscribe((code) => {
      state.dispatch(this.refreshCode(code));
    });
  }

  public refreshCode(code: CodeSharingMessage): RefreshCodeAction {
    return {
      type: REFRESH_CODE,
      payload: {
        code: code.code
      }
    };
  }

  public changeLang(lang: string): ChangeLangAction {
    return {
      type: CHANGE_LANG,
      payload: {
        lang
      }
    };
  }

  public sendCode(codeState: CodeSharingMessage) {
    this.appSocket.sendCode(codeState);
    return this.refreshCode(codeState);
  }
}
