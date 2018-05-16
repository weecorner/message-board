import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import uuidv1 from 'uuid'
import moment from 'moment'
import {addComment} from '../action-creators/posts'
import FormErrors from './FormErrors' 

const mapStateToProps = state => {
  return { post: state.post }
};

const mapDispatchToProps = dispatch => {
  return {
    addComment: comment => dispatch(addComment(comment))
  };
};

class Post extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      message: '',
      user: '',
      replyTime: '',
      formErrors: {message: '', user: ''},
      fieldValid: false,
      disabled: false
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  handleUserInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value},
      () => {this.validateField(name, value)}
    );
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let fieldValid = this.state.fieldValid;
    let formDisabled = this.state.disabled;

    fieldValid = value.length < 30 ;
    fieldValidationErrors[fieldName] = fieldValid ? '' : ' must be less than 30 characters';
    formDisabled = Object.keys(fieldValidationErrors).every((fieldName, i) => {
      return fieldValidationErrors[fieldName].length === 0;
    });
    
    this.setState({formErrors: fieldValidationErrors, fieldValid: fieldValid, disabled: !formDisabled},);
  }

  handleSubmit(event) {
    event.preventDefault();
    const timeToFormat = moment().format("MM/DD/YY @h:mma");
    const comment = {
      id: uuidv1(),
      message: this.state.message,
      user: this.state.user,
      replyTime: timeToFormat,
      formErrors: this.state.formErrors,
      fieldValid: this.state.fieldValid,
      disabled: this.state.disabled
    };
    this.props.addComment(comment);
    this.setState({
      id: '',
      message: '',
      user: '',
      replyTime: '',
      formErrors: {message: '', user: ''},
      fieldValid: false,
      disabled: false
    });
  }

  render() {

    return (
      <div>
        <div className="post-detail">
          <h2 className="title">{this.props.post.title}</h2>
          <div>
            <h5 className="message">{`By: ${this.props.post.user}`}</h5>
            <h5 className="created-time">{` On: ${this.props.post.createdTime}`}</h5>
            <button className="back-to-posts"><Link to="/posts">Back to Posts</Link></button>
          </div>
          <br />
          <p>
            {this.props.post.message}
          </p>
        </div>
        <hr className="dashed" />
        <ul className="replylist list-group">
          <li><h5><strong>Responses</strong></h5></li>
          {
            this.props.post.comments.length === 0 && 
            <li><div className="no-reply"><span className="no-post-message">There are currently no replies...add one!</span></div></li>
          }
          {
            this.props.post.comments && 
            this.props.post.comments.map(comment => (
              <li className="list-group-item reply" key={comment.id}>
                <h4>{`${comment.user}:`}</h4>
                <p>{comment.message}</p>
              </li>
            ))
          }
        </ul>
        <hr className="solid"/>
        <div>
          <div>
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <form className="form-horizontal" onSubmit = {this.handleSubmit}>
            <fieldset>
            <div className="reply-content">
              <div className="form-group no-margin">
                <label className="form-control-label reply-label">Reply Message</label>
                <input
                  className="form-control"
                  type="text"
                  name="message"
                  onChange= {this.handleUserInput}
                  value={this.state.message}
                  required="true"
                />
              </div>
              <div className="form-group no-margin">
                <label className="form-control-label reply-label">Reply User</label>
                <input
                  className="form-control"
                  type="text"
                  name="user"
                  onChange= {this.handleUserInput}
                  value={this.state.user}
                  required="true"
                />
              </div>
              </div>
              <div className='reply-button'>
                <button class = 'reply-post' type='submit' disabled={this.state.disabled}>Post Reply</button>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="back-to-posts-div">
          <hr className="solid" />
          <button className="back-to-posts-button"><Link to="/posts">Back to Posts</Link></button>
        </div>
      </div>
      )
  }
}

const PostContainer = connect(mapStateToProps, mapDispatchToProps)(Post);

export default withRouter(PostContainer);