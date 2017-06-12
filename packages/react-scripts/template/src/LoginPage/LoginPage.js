import React, { PropTypes } from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class LoginPage extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      instructor: {
        username: '',
        password: '',
        isAuthenticating: 'false',
        isAuthenticating: 'false',
      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const username = this.state.instructor.username;
    const password = this.state.instructor.password;
    this.props.dispatch(actions.loginUser(username, password));
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const instructor = this.state.instructor;
    instructor[field] = event.target.value;

    this.setState({
      instructor,
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        instructor={this.state.instructor}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    username: state.username,
    password: state.password,
  };
};

export default connect(mapStateToProps)(LoginPage);
