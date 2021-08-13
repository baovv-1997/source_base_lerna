import { handleActions } from 'redux-actions';

import actions from 'stores/actions';

const initialState = {
  message: {
    isShow: false,
    position: {
      vertical: 'top',
      horizontal: 'center',
    },
    content: 'Message will be shown',
    type: 'success',
    duration: 3000,
  },
};

export default handleActions(
  {
    [actions.app.setMessage]: (state = initialState, action) => {
      return { ...state, message: { ...state.message, ...action.payload } };
    },
  },
  initialState
);
