import {Injectable} from 'angular2/core';
import {Action} from './Action';
import {Message} from '../model/chat/message';

const SEND_MESSAGE = 'SEND_MESSAGE';

interface ISendMessageAction extends Action {
  payload: {
    message: Message;
  };
}

export interface ChatState {
    messages: Message[];
}

const initialState: ChatState = {
    messages: []
};

export function chat(state: ChatState = initialState, action: Action): ChatState {
  switch (action.type) {
    case SEND_MESSAGE:
      return Object.assign({}, state, {
        messages: [...state.messages, action.payload.message]
      });
    default:
      return state;
  }
}

@Injectable()
export class ChatActions {
  sendMessage(message: Message): ISendMessageAction {
    return {
      type: SEND_MESSAGE,
      payload: {
        message
      }
    };
  }
}
