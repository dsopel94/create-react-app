import { combineReducers } from 'redux';
import registerReducer from './register_reducer';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
});

export default rootReducer;
