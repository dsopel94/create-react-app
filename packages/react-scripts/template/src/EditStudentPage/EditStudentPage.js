import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class EditStudentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      student: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        streetAddress: '',
        miscAddress: '',
      },
      isSubmitted: false,
    };
    this.updateInput = this.updateInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  updateInput(event) {
    const field = event.target.name;
    const student = this.state.student;
    student[field] = event.target.value;
    this.setState({
      student,
    });
  }

  handleLogout(event) {
    cookies.remove('instructor');
    cookies.remove('token');
  }

  componentWillMount() {
    this.props.dispatch(actions.getStudent(this.props.match.params.cuid));
    console.log("Let's see what happens here");
  }
  onSubmit(event) {
    event.preventDefault();
    const firstName = this.state.student.firstName;
    const lastName = this.state.student.lastName;
    const phoneNumber = this.state.student.phoneNumber;
    const streetAddress = this.state.student.streetAddress;
    const miscAddress = this.state.student.miscAddreess;
    const id = this.props.match.params.cuid;
    this.props.dispatch(actions.getStudent(id));

    window.location.href = `http://localhost:3000/courses/${this.props.studentCourse}`;
    this.setState({
      isSubmitted: true,
    });
    this.props.dispatch(
      actions.editStudent(
        firstName,
        lastName,
        phoneNumber,
        streetAddress,
        miscAddress,
        id
      )
    );
  }
  render() {
    if (this.state.isSubmitted) {
      //return <Redirect to={`/courses/${this.props.match.params.cuid}`} />
    }
    return (
      <form action="/" onSubmit={this.onSubmit}>
        <div className="nav-options">
          <Link to={`/courses/${this.props.studentCourse}`}>
            Back to Your Course
          </Link>
          <Link to="/login" onClick={this.handleLogout}>Log out </Link>
        </div>
        <div className="container">
          <div className="submitForm">
            <div className="field-line">
              <label htmlFor="firstName">First Name:</label>
              <input
                id="firstName"
                name="firstName"
                value={this.state.firstName}
                onChange={this.updateInput}
              />
            </div>
            <div className="field-line">
              <label htmlFor="lastName">Last Name:</label>
              <input
                id="lastName"
                name="lastName"
                value={this.state.lastName}
                onChange={this.updateInput}
              />
            </div>
            <div className="field-line">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.updateInput}
              />
            </div>
            <div className="field-line">
              <label htmlFor="streetAddress">Street Address:</label>
              <input
                id="streetAddress"
                name="streetAddress"
                value={this.state.streetAddress}
                onChange={this.updateInput}
              />
            </div>
            <div className="field-line">
              <label htmlFor="miscAddress">City, State, Zip:</label>
              <input
                id="miscAddress"
                name="miscAddress"
                value={this.state.miscAddress}
                onChange={this.updateInput}
              />
            </div>
            <button type="submit" className="edit-student">Edit Student</button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    firstName: state.student.firstName,
    lastName: state.student.lastName,
    phoneNumber: state.student.phoneNumber,
    courses: state.student.courses,
    studentCourse: state.student.student.courses,
  };
};
export default connect(mapStateToProps)(EditStudentPage);
