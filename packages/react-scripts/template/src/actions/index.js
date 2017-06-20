import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  PROTECTED_TEST,
  ADD_COURSE,
} from './types';

import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

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
      .post('http://localhost:3001/api/auth/register', {
        username: username,
        fullName: fullName,
        password: password,
      })
      .then(res => {
        // cookie.save('token', res.data.token, { path: '/' });
        window.location.href = 'http://localhost:3000/login';
        // dispatch({ type: REGISTER_USER_SUCCESS });
      });
    // .catch(error => {
    //   errorHandler(dispatch, error.response, AUTH_ERROR);
    // });
  };
};

//
export const loginUser = (username, password) => {
  return function(dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
      username: username,
      password: password,
    });
    axios
      .post(`${API_URL}/auth/login`, { username, password })
      .then(response => {
        cookies.set('token', response.data.token, { path: '/' });
        cookies.set('instructor', response.data.instructor, { path: '/' });
        console.log(cookies.get('instructor'));
        console.log(response.data);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          fullName: response.data.instructor.fullName,
        });
        //window.location.href = 'http://localhost:3000/auth/dashboard'
      })
      .catch(error => {
        dispatch({
          type: LOGIN_USER_FAILURE,
        });
      });
    // .catch(error => {
    //   errorHandler(dispatch, error.response, AUTH_ERROR);
    // });
  };
};
//http://localhost:3001/courses
export const addCourse = (name, instructor) => {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/courses`, {
        name: name,
        _creator: instructor,
      })
      .then(response => {
        cookies.get('instructor');
        dispatch({
          type: ADD_COURSE,
          coursename: name,
          _creator: cookies.get('instructor')._id,
        });
        console.log(response.data);
      });
  };
};
// export function protectedTest() {
//   return function(dispatch) {
//     axios
//       .get(`${API_URL}/protected`, {
//         headers: { Authorization: cookie.load('token') },
//       })
//       .then(response => {
//         dispatch({
//           type: PROTECTED_TEST,
//           payload: response.data.content,
//         });
//       })
//       .catch(error => {
//         errorHandler(dispatch, error.response, AUTH_ERROR);
//       });
//   };
// }
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
