import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from './SignUpForm';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class SignUpPage extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      instructor: {
        fullName: '',
        username: '',
        password: '',
      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser = event => {
    const field = event.target.name;
    const instructor = this.state.instructor;
    instructor[field] = event.target.value;

    this.setState({
      instructor,
    });
  };

  processForm = event => {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const fullName = this.state.instructor.fullName;
    const username = this.state.instructor.username;
    const password = this.state.instructor.password;
    this.props.dispatch(actions.registerUser(username, fullName, password));
  };

  // let this.hacky;
  componentDidMount() {
    // this.props.dispatch(actions.registerUser(username,fullName,password));
    /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  }
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        instructor={this.state.instructor}
      />
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    username: state.username,
    password: state.password,
    fullName: state.fullName,
  };
};

export default connect(mapStateToProps)(SignUpPage);
