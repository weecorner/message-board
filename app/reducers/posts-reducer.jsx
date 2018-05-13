import {
  RECEIVE_POSTS,
  RECEIVE_POST
} from '../constants';

const initialState = {
  post: {},
  posts: [{
    id: 1,
    title: "title one",
    message: "text text text text text",
    user: "user one",
    comments: ["first comment", "second comment"],
    createdTime: "05/12/18 @3:22pm",
    updatedTime: "05/12/18 @3:22pm"
  }, {
    id: 2,
    title: "title two",
    message: "text text text text text text text text text",
    user: "user two",
    comments: ["first comment", "second comment", "third comment"],
    createdTime: "05/12/18 @3:22pm",
    updatedTime: "05/12/18 @3:22pm"
  }]
};

const rootReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_POSTS:
      newState.posts = action.posts;
      break;
    case RECEIVE_POST:
      newState.post = action.post;
      break;
    default:
      return state;
  };
  return newState;
};

export default rootReducer;