import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {receivePosts, deletePost} from '../action-creators/posts'
import NewPostContainer from './NewPostContainer'

const mapStateToProps = state => {
  return { posts: state.posts }
};

const Posts = ({ posts }) => (
    <div>
    <h2>The Fairygodboss Message Board</h2>
    {
      posts && posts.map(post => (
        <li className="list-group-item" key={post.id}>
          <h4>{`${post.title} ${post.message}`}</h4>
          <h5>{`Posted By: ${post.user}`}</h5><Link to={`/posts/${post.id}`}>{`${post.comments.length} Comments`}</Link><h5>{`Last Update: ${post.updatedTime}`}</h5>
        </li>
      ))
    }
    <button><Link to="/new-post">Create new post</Link></button>
  </div>
);

const PostsContainer = connect(mapStateToProps)(Posts);

export default PostsContainer;