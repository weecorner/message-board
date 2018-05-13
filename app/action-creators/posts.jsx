import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_REPLY
} from '../constants'

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

export const getPostById = postId => {
  return (dispatch, getState) => {
    const post = getState().posts.find((post) => {
      post.id === postId;
    });
    dispatch(receivePost(post));
  }
};

export const addNewPost = post => {
  return (dispatch, getState) => {
    const newListOfPosts = getState().posts.concat([post]);
    dispatch(receivePosts(newListOfPosts));
  }
};

export const addReply = reply => {
  return (dispatch, getState) => {
    const selectedPost = getState().posts.selected;
    const replies = selectedPost.replies;
    const newReplies = replies.concat([reply]);
    const newSelectedPost = Object.assign({}, selectedPost, {replies: newReplies});
    dispatch(receivePost(newSelectedPost));
  }
};