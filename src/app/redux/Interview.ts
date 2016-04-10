import {Injectable, Inject} from 'angular2/core';
import {Action} from './Action';
import {parse} from 'querystring';
import {InterviewResource} from '../services/interview.resource';
import {AppStore} from './AppStore';
import {Interview} from '../model/interview';
import {Store} from 'redux';
import {APP_STATE} from './Constants';

const CHANGE_ROOM = 'CHANGE_ROOM';
const INTERVIEW_LOADED = 'INTERVIEW_LOADED';

interface ChangeRoomAction extends Action {
  payload: {
    roomId
  };
}

interface InterviewLoadedAction extends Action {
  payload: {
    interview: Interview;
  };
}

export interface InterviewState {
  roomId: string;
  interview: Interview;
}

function changeRoomReducer(state: InterviewState, action: ChangeRoomAction): InterviewState {
  return Object.assign({}, state, {
    roomId: action.payload.roomId
  });
}

function interviewLoadedReducer(state: InterviewState, action: InterviewLoadedAction): InterviewState {
  return Object.assign({}, state, {
    interview: action.payload.interview
  });
}

const initialState: InterviewState = {
  roomId: parse(window.location.search)['?interviewId'],
  interview: null
};

export function interview(state: InterviewState = initialState, action: Action): InterviewState {
  switch (action.type) {
    case CHANGE_ROOM:
      return changeRoomReducer(state, action);
    case INTERVIEW_LOADED:
      return interviewLoadedReducer(state, action);
    default:
      return state;
  }
}

@Injectable()
export class InterviewActions {
  constructor(
    @Inject(APP_STATE) private appState: Store,
    private interviewResource: InterviewResource
  ) {
  }

  changeRoom(roomId): ChangeRoomAction {
    return {
      type: CHANGE_ROOM,
      payload: {
        roomId
      }
    };
  }

  getOne(id) {
    this.interviewResource.getOne(id).subscribe((interview) => {
      this.appState.dispatch({
        type: INTERVIEW_LOADED,
        payload: {
          interview
        }
      });
    }, () => {
      window.location.assign('/');
    });
  }

  start() {
    const state = this.appState.getState();
    const interviewId = state.interview.roomId;

    this.interviewResource.start(interviewId);
  }

  hangup() {
    const state = this.appState.getState();
    const interviewId = state.interview.roomId;
    const interviewOwner = state.interview.interview.owner._id;
    const interviewCandidate = state.interview.interview.candidate._id;
    const me = state.user.me;
    this.interviewResource.hangup(interviewId);

    if(me === interviewOwner) {
      window.location.assign(`/interview/${interviewId}/feedbackform`);
    } else {
      window.close();
    }
  }
}
