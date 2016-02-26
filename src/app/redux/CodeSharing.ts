import {Injectable} from 'angular2/core';
import {Action} from './Action';

const REFRESH_CODE = 'REFRESH_CODE';

interface RefreshCodeAction extends Action {
  payload: {
    code: string
  }
}

interface CodeSharingState {
  code: string;
}

const initialState: CodeSharingState = {
  code: ''
}

export function codeSharing(state: CodeSharingState = initialState, action: Action): CodeSharingState {
  switch(action.type) {
    case REFRESH_CODE:
      return Object.assign({}, state, {
        code: action.payload.code
      });
    default:
      return state;
  }
}

@Injectable()
export class CodeSharingActions {
  public refreshCode(code: string): RefreshCodeAction {
    return {
      type: REFRESH_CODE,
      payload: {
        code
      }
    }
  }
}
