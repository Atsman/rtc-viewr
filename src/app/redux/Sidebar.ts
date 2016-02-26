import {Injectable} from 'angular2/core';
import {Action} from './Action';

export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';

interface ShowSidebarAction extends Action {
  payload: {
    activeElement: string
  }
}

interface SidebarState {
  active: string;
}

const initialState: SidebarState = {
  active: ''
};

function showSidebarReducer(state: SidebarState, action: ShowSidebarAction) {
  let newActive = '';
  if (state.active !== action.payload.activeElement) {
      newActive = action.payload.activeElement
  }
  return Object.assign({}, state, {
      active: newActive
  });
}

export function sidebar(state: SidebarState = initialState, action: Action): SidebarState {
  switch (action.type) {
    case SHOW_SIDEBAR:
      return showSidebarReducer(state, action);
    default:
      return state;
  }
}

@Injectable()
export class SidebarActions {
  showSidebar(activeElement: string): ShowSidebarAction {
    return {
      type: SHOW_SIDEBAR,
      payload: {
        activeElement
      }
    }
  }
}
