import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  PROTECTED_TEST,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  message: '',
  content: '',
  authenticated: false,
  authenticating: false,
  username: '',
  fullName: '',
  password: '',
};

export default function(state = INITIAL_STATE, action) {
  console.log('anything?');
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case PROTECTED_TEST:
      return { ...state, content: action.payload };
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        fullName: action.fullName,
        username: action.userName,
        password: action.password,
        authenticating: true,
      };
    case LOGIN_USER_SUCCESS:
      console.log(';', action.fullName);
      console.log(';;', action);
      return {
        ...state,
        fullName: action.fullName,
        username: action.username,
        password: action.password,
        authenticating: false,
        authenticated: true,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        username: action.payload,
        password: action.payload,
        authenticating: false,
        authenticated: false,
      };
  }

  return state;
}
