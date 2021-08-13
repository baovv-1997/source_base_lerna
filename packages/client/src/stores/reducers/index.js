import { combineReducers } from 'redux';

import app from './app';
import authentication from './authentication';

const reducers = combineReducers({
  appStore: app,
  authenticationStore: authentication,
});

export default reducers;
