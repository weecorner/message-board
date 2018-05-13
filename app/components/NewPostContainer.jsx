import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import uuidv1 from 'uuid'
import moment from 'moment'
import {addNewPost} from '../action-creators/posts'
import FormErrors from './FormErrors'

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
      updatedTime: '',
      formErrors: {title: '', message: '', user: ''},
      fieldValid: false,
      disabled: false
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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
    console.log(formDisabled, 'formDisabled');

    fieldValid = value.length < 10 ;
    fieldValidationErrors[fieldName] = fieldValid ? '' : ' must be less than 10 characters';
    formDisabled = Object.keys(fieldValidationErrors).every((fieldName, i) => {
      return fieldValidationErrors[fieldName].length === 0;
    });
    
    this.setState({formErrors: fieldValidationErrors, fieldValid: fieldValid, disabled: !formDisabled},);
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
      updatedTime: '',
      formErrors: {title: '', message: '', user: ''},
      fieldValid: false,
      disabled: false
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
      updatedTime: timeToFormat,
      formErrors: this.state.formErrors,
      fieldValid: this.state.fieldValid,
      disabled: this.state.disabled
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
      updatedTime: '',
      formErrors: {title: '', message: '', user: ''},
      fieldValid: false,
      disabled: false
    });
  }

  render() {

    return (
      <div>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <form className="form-horizontal" onSubmit = {this.handleSubmit}>
          <fieldset>
            <legend>Create a new post</legend>
            <div className="form-group">
              <lable className="col-xs-4 form-control-label">Title</lable>
              <input
                className="form-control"
                type="text"
                name="title"
                onChange= {this.handleUserInput}
                value={this.state.title}
                required="true"
              />
            </div>
            <div className="form-group">
              <lable className="col-xs-4 control-lable">Message</lable>
              <div>
                <input
                  className="form-control"
                  type="text"
                  name="message"
                  onChange= {this.handleUserInput}
                  value={this.state.message}
                  required="true"
                />
              </div>
            </div>
            <div className="form-group">
              <lable className="col-xs-4 control-lable">User</lable>
              <div>
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
            <div>
              <button onClick={this.handleCancel}>Clear</button>
              <button type='submit' disabled={this.state.disabled}>Create Post</button>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}

const NewPostContainer = connect(null, mapDispatchToProps)(NewPost);

export default withRouter(NewPostContainer);