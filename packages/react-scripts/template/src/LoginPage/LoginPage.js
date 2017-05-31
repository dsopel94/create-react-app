import React, { PropTypes } from 'react';
import LoginForm from './LoginForm';

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
        email: '',
        password: '',
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
    const userName = encodeURIComponent(this.state.instructor.userName);
    const password = encodeURIComponent(this.state.instructor.password);
    const formData = `userName=${userName}&password=${password}`;
    // create an AJAX request
    // const xhr = new XMLHttpRequest();
    // xhr.open('post', '/auth/login');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     // success
    //
    //     // change the component-container state
    //     this.setState({
    //       errors: {}
    //     });
    //
    //     // save the token
    //     Auth.authenticateUser(xhr.response.token);
    //
    //
    //     // change the current URL to /
    //     this.context.router.replace('/');
    //   } else {
    //     // failure
    //
    //     // change the component state
    //     const errors = xhr.response.errors ? xhr.response.errors : {};
    //     errors.summary = xhr.response.message;
    //
    //     this.setState({
    //       errors
    //     });
    //   }
    // });
    // xhr.send(formData);
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

// LoginPage.contextTypes = {
//   router: PropTypes.object.isRequired,
//   history: PropTypes.object.isRequired
// };

export default LoginPage;
