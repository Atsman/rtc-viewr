import {combineReducers, createStore, applyMiddleware} from 'redux';
import {sidebar} from './Sidebar';
import {chat} from './Chat';
import {interview} from './Interview';
import {user} from './User';
import {codeSharing} from './CodeSharing';
const createLogger: any = require('redux-logger');

const appReducer = combineReducers({
  sidebar,
  chat,
  interview,
  user
});

const logger = createLogger();

export const appStore = createStore(
  appReducer,
  applyMiddleware(logger)
);
