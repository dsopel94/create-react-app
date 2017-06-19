import { combineReducers } from 'redux';
import registerReducer from './register_reducer';
import authReducer from './auth_reducer';
import courseReducer from './course_reducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  course: courseReducer,
});

export default rootReducer;
