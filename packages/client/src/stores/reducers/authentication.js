import { handleActions } from 'redux-actions';

import actions from 'stores/actions';

const initialState = {
  loaded: true,
  isAuthenticated: false,
};

export default handleActions(
  {
    [actions.authentication.setAuthenticated]: (state = initialState) => {
      return { ...state, isAuthenticated: true };
    },
    [actions.authentication.logout]: (state = initialState) => {
      return { ...state, ...initialState };
    },
  },
  initialState
);
