import { createAction } from 'redux-actions';

export const setAuthenticated = createAction('AUTHENTICATION_AUTHENTICATED');
export const logout = createAction('AUTHENTICATION_LOGOUT');
