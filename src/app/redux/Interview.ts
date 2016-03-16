import {Injectable} from 'angular2/core';
import {Action} from './Action';
import {parse} from 'querystring';

const CHANGE_ROOM = 'CHANGE_ROOM';

interface IChangeRoomAction extends Action {
  payload: {
    roomId
  };
}

export interface InterviewState {
  roomId: string;
}

const initialState: InterviewState = {
  roomId: parse(window.location.search)['?interviewId']
};

export function interview(state: InterviewState = initialState, action: Action): InterviewState {
  switch (action.type) {
    case CHANGE_ROOM:
      return Object.assign({}, state, {
        roomId: action.payload.roomId
      });
    default:
      return state;
  }
}

@Injectable()
export class InterviewActions {
  changeRoom(roomId): IChangeRoomAction {
    return {
      type: CHANGE_ROOM,
      payload: {
        roomId
      }
    };
  }
}
