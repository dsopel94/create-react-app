import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Link } from 'react-router-dom';
import { Route } from 'react-router';
import LoginPage from '../LoginPage/LoginPage';

const SignUpForm = (
  {
    onSubmit,
    onChange,
    errors,
    instructor,
  }
) => (
  <form action="/" onSubmit={onSubmit}>
    <div className="container">
      <h1 className="header">School Management App</h1>
      <h2 className="sign-up">Sign Up</h2>
      <div className="field-line">
        <label htmlFor="fullName">Full Name:</label>
        <input
          id="fullName"
          name="fullName"
          onChange={onChange}
          value={instructor.fullName}
        />
      </div>
      <div className="field-line">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          onChange={onChange}
          value={instructor.username}
        />
      </div>
      <div className="field-line">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          onChange={onChange}
          value={instructor.password}
        />
      </div>
      <div className="button-line">
        <button type="submit" className="sign-up-button">
          Create New Account
        </button>
      </div>

      <div className="login-redirect">
        Already have an account? <Link to={'/login'}> Log in</Link>
        <p>
          Want more info about this app?
          {' '}
          <Link to={'/info'}>Click here</Link>
          {' '}
        </p>
      </div>
    </div>
    <Route path="/login" component={LoginPage} />
  </form>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  instructor: PropTypes.object.isRequired,
};

export default SignUpForm;
