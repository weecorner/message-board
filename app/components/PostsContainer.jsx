import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {receivePost} from '../action-creators/posts'
import NewPostContainer from './NewPostContainer'

const mapStateToProps = state => {
  return { posts: state.posts }
};

const mapDispatchToProps = dispatch => {
  return {
    selectPost: (post) => dispatch(receivePost(post))
  };
};

const Posts = ({ posts, selectPost }) => (
    <div>
    <h2>The Fairygodboss Message Board</h2>
    {
      posts.length === 0 && 
      <h4>There are currently no posts...add one!</h4>
    }
    {
      posts && posts.map(post => (
        <li className="list-group-item" key={post.id}>
          <h4>{`${post.title} ${post.message}`}</h4>
          <h5>{`Posted By: ${post.user}`}</h5><Link to={`/posts/${post.id}`} onClick={() => selectPost(post)}>{`${post.comments.length} Comments`}</Link><h5>{`Last Update: ${post.updatedTime}`}</h5>
        </li>
      ))
    }
    <button><Link to="/new-post">Create new post</Link></button>
  </div>
);

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;