import {
  RECEIVE_POSTS,
  RECEIVE_POST
} from '../constants'

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

export const addNewPost = post => {
  return (dispatch, getState) => {
    const newListOfPosts = getState().posts.concat([post]);
    dispatch(receivePosts(newListOfPosts));
  }
};

export const addComment = comment => {
  return (dispatch, getState) => {
    const selectedPost = getState().post;
    const index = getState().posts.indexOf(selectedPost);
    const comments = selectedPost.comments;
    const newComments = comments.concat([comment]);
    const updatedTime = comment.replyTime;
    const newSelectedPost = Object.assign({}, selectedPost, {comments: newComments, updatedTime: updatedTime});
    const newPosts = [ ...getState().posts.slice(0, index), newSelectedPost, ...getState().posts.slice(index+1)];
    dispatch(receivePost(newSelectedPost));
    dispatch(receivePosts(newPosts));
  }
};