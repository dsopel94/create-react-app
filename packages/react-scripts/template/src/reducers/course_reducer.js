import { ADD_COURSE } from '../actions/types';

const INITIAL_STATE = {
  coursename: [],
  _creator: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_COURSE:
      return {
        ...state,
        coursename: [...state.coursename, action.coursename],
        _creator: action._creator,
      };
  }
  return state;
}
