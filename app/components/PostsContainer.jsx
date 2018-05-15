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
  <div className="message-board">
    <h2 className="text-center">The Fairygodboss Message Board</h2>
    <ul className="postlist list-group">
    {
      posts.length === 0 && 
      <li><div className="no-post"><span className="no-post-message">There are currently no posts...add one!</span></div></li>
    }
    {
      posts && posts.map(post => (
        <li className="list-group-item post" key={post.id}>
          <div className="post-item">
            <div>
              <h4 className="title">{`${post.title}: `}</h4><h4 className="message">{post.message}</h4>
            </div>
            <p className="user">{`Posted By: ${post.user}`}</p>
            <span className="comments"><Link to={`/posts/${post.id}`} onClick={() => selectPost(post)}>{`${post.comments.length} Comments`}</Link></span>
            <p className="updated-time">{`Last Update: ${post.updatedTime}`}</p>
          </div>
          <span><Link to={`/posts/${post.id}`} onClick={() => selectPost(post)}>
            <div className="triangle-right"></div>
          </Link></span>
        </li>
      ))
    }
    </ul>
    <div class="post-div">
      <button class="post-button"><Link to="/new-post">Create new post</Link></button>
    </div>
  </div>
);

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;