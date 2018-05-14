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

    fieldValid = value.length < 10 ;
    fieldValidationErrors[fieldName] = fieldValid ? '' : ' must be less than 10 characters';
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
        <h4>{`${this.props.post.title} ${this.props.post.message}`}</h4>
        <h5>{`By: ${this.props.post.user}`}</h5><h5>{` On: ${this.props.post.createdTime}`}</h5>
        <button><Link to="/posts">Back to Posts</Link></button>
        <p>
          {this.props.post.message}
        </p>
        <hr />
        <div>
          {
            this.props.post.comment && 
            <h5>Responses</h5>
          }
          {
            this.props.post.comments && this.props.post.comments.map(comment => (
              <li className="list-group-item" key={comment.id}>
                <h4>{`${comment.user}:`}</h4>
                <h5>{comment.message}</h5>
                <hr/>
              </li>
            ))
          }
        </div>
        <hr />
        <div>
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <form className="form-horizontal" onSubmit = {this.handleSubmit}>
            <fieldset>
              <div className="form-group">
                <lable className="col-xs-8 form-control-label">Reply Message</lable>
                <input
                  className="form-control"
                  type="text"
                  name="message"
                  onChange= {this.handleUserInput}
                  value={this.state.message}
                  required="true"
                />
              </div>
              <div className="form-group">
                <lable className="col-xs-4 form-control-label">Reply User</lable>
                <input
                  className="form-control"
                  type="text"
                  name="user"
                  onChange= {this.handleUserInput}
                  value={this.state.user}
                  required="true"
                />
              </div>
              <div>
                <button type='submit' disabled={this.state.disabled}>Post Reply</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      )
  }
}

const PostContainer = connect(mapStateToProps, mapDispatchToProps)(Post);

export default withRouter(PostContainer);