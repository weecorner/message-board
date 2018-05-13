import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom' 
import PostsContainer from './PostsContainer'
import PostContainer from './PostContainer'
import NewPostContainer from './NewPostContainer'

const App = () => (
  <div className="background">
    <Switch>
      <Route exact path='/posts' component={PostsContainer} />
      <Route path='/posts/:id' component={PostContainer} />
      <Route path='/new-post' component={NewPostContainer} />
      <Redirect from='/' to='/posts' />
    </Switch>
  </div>
);

export default App;

