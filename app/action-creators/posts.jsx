import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_REPLY
} from '../constants'

import {hashHistory} from 'react-router';

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
    const post = getState().list.find((post) => {
      post.id === postId;
    });
    dispatch(receivePost(post));
    hashHistory.push(`/posts/${postId}`);
  }
};

export const addNewPost = post => {
  return (dispatch, getState) => {
    const newListOfPosts = getState().list.concat([post]);
    dispatch(receivePosts(newListOfPosts));
    hashHistory.push(`/posts/${post.id}`);
  }
};

export const addReply = reply => {
  return (dispatch, getState) => {
    const selectedPost = getState().posts.selected;
    const replies = selectedPost.replies;
    const newReplies = replies.concat([reply]);
    const newSelectedPost = Object.assign({}, selectedPost, {replies: newReplies});
    dispatch(receivePost(newSelectedPost));
    hashHistory.push(`/posts/${post.id}`);
  }
};