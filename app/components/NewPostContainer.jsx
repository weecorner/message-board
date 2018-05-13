import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import uuidv1 from 'uuid'
import moment from 'moment'
import {addNewPost} from '../action-creators/posts'

const mapDispatchToProps = dispatch => {
  return {
    addNewPost: post => dispatch(addNewPost(post))
  };
};

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      message: '',
      user: '',
      comments: [],
      createdTime: '',
      updatedTime: ''
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  handleUserChange(event) {
    this.setState({user: event.target.value});
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({
      id: '',
      title: '',
      message: '',
      user: '',
      comments: [],
      createdTime: '',
      updatedTime: ''
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const timeToFormat = moment().format("MM/DD/YY @h:mma");
    const post = {
      id: uuidv1(),
      title: this.state.title,
      message: this.state.message,
      user: this.state.user,
      comments: [],
      createdTime: timeToFormat,
      updatedTime: timeToFormat
    };
    this.props.addNewPost(post);
    this.props.history.push('/posts');
    this.setState({
      id: '',
      title: '',
      message: '',
      user: '',
      comments: [],
      createdTime: '',
      updatedTime: ''
    });
  }

  render() {
    return (
      <div>
        <form className="form-horizontal" onSubmit = {this.handleSubmit}>
          <fieldset>
            <legend>Create a new post</legend>
            <div className="form-group">
              <lable className="col-xs-4 control-lable">Title</lable>
              <div>
                <input
                  className="form-control"
                  type="text"
                  onChange= {this.handleTitleChange}
                  value={this.state.title}
                />
              </div>
            </div>
            <div className="form-group">
              <lable className="col-xs-4 control-lable">Message</lable>
              <div>
                <input
                  className="form-control"
                  type="text"
                  onChange= {this.handleMessageChange}
                  value={this.state.message}
                />
              </div>
            </div>
            <div className="form-group">
              <lable className="col-xs-4 control-lable">User</lable>
              <div>
                <input
                  className="form-control"
                  type="text"
                  onChange= {this.handleUserChange}
                  value={this.state.user}
                />
              </div>
            </div>
            <div>
              <button onClick={this.handleCancel}>Clear</button>
              <button type='submit'>Create Post</button>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}

const NewPostContainer = connect(null, mapDispatchToProps)(NewPost);

export default withRouter(NewPostContainer);