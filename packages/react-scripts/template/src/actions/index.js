import axios from 'axios';
import cookie from 'react-cookie';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  PROTECTED_TEST,
} from './types';

const API_URL = 'http://localhost:3001/api';

export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if (error.data.error) {
    errorMessage = error.data.error;
  } else if (error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if (error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please try again.',
    });
  } else {
    dispatch({
      type: type,
      payload: errorMessage,
    });
  }
}

export const registerUser = (
  username,
  fullName,
  password,
  redirect = '/login'
) => {
  return function(dispatch) {
    console.log('This is getting called!');
    axios
      .post('${API_URL}/auth/register', {
        username: username,
        fullName: fullName,
        password: password,
      })
      .then(res => {
        cookie.save('token', res.data.token, { path: '/' });
        dispatch({ type: REGISTER_USER_SUCCESS });
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
};

//
export const loginUser = (username, password) => {
  return function(dispatch) {
    axios
      .post(`${API_URL}/auth/login`, { username, password })
      .then(response => {
        cookie.save('token', response.data.token, { path: '/' });
        dispatch({ type: AUTH_USER });
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
};
//  export default function actions;
// export function logoutUser() {
//   return function (dispatch) {
//     dispatch({ type: UNAUTH_USER });
//     cookie.remove('token', { path: '/' });
//
//     window.location.href = CLIENT_ROOT_URL + '/login';
//   }
// }
//
// export function protectedTest() {
//   return function(dispatch) {
//     axios.get(`${API_URL}/protected`, {
//       headers: { 'Authorization': cookie.load('token') }
//     })
//     .then(response => {
//       dispatch({
//         type: PROTECTED_TEST,
//         payload: response.data.content
//       });
//     })
//     .catch((error) => {
//       errorHandler(dispatch, error.response, AUTH_ERROR)
//     });
//   }
// }
