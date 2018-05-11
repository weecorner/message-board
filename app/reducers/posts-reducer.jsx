import {
  RECEIVE_POSTS,
  RECEIVE_POST
} from '../constants';

const initialState = {
  selected: {},
  list: []
};

export default function(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_POSTS:
      newState.list = action.posts;
      break;
    case RECEIVE_POST:
      newState.selected = action.post;
      break;
    default:
      return state;
  }
}