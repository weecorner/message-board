import React from 'react'
import {Router, Route, hashHistory, IndexRedirect, IndexRoute} from 'react-router'
import {Provider} from 'react-redux'
import store from './store'
import App from './components/App'
import Posts from './components/Posts'
import PostsContainer from './containers/PostsContainer'
import PostContainer from './containers/PostContainer'
import ReplyContainer from './containers/ReplyContainer'
import NewPostContainer from './containers/NewPostContainer'
import {receivePosts, getPostById} from './action-creators/posts'

const onPostEnter = (nextRouterState) => {
  const postId = nextRouterState.params.postId;
  store.dispatch(getPostById(postId));
};

export const Root = () => {
  return (
    <Provider store = {store}>
      <Router history = {hashHistory}>
        <Route path='/' component = {App}>
          <Route path='/posts' component = {PostsContainer} />
          <Route path='/posts/:postId' component = {PostContainer} onEnter = {onPostEnter} />
          <Route path='/new-post' component = {NewPostContainer} />
        </Route>
      </Router>
    </Provider>
    )
}