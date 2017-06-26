import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import ShowStudentInfo from '../ShowStudentInfo/ShowStudentInfo';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class CoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: {},
      student: {},
      isClicked: false,
    };
    console.log(this.props.match.params.cuid);
    this.onClick = this.onClick.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  onClick(event) {
    console.log(this.state.isClicked);
    this.setState({
      isClicked: !this.state.isClicked,
    });
  }

  handleRedirect(event) {
    this.props.dispatch(actions.setAsAuthenticated());
  }

  handleLogout(event) {
    cookies.remove('instructor');
    cookies.remove('token');
  }

  deleteCourse(event) {
    const id = this.props.match.params.cuid;
    this.props.dispatch(actions.deleteCourse(id));
    this.props.dispatch(actions.setAsAuthenticated());
    console.log('this is working');
  }
  componentDidMount() {
    this.props.dispatch(actions.getCourse(this.props.match.params.cuid));
    this.props.dispatch(actions.getStudents());
  }

  render() {
    let studentList = this.props.student;
    const students = Object.keys(studentList).map(
      student => studentList[student]
    );
    const currentStudents = students.map(student => {
      if (this.props.match.params.cuid == student.courses) {
        return (
          <p>
            <div className="student-info">
              <ShowStudentInfo
                firstName={student.firstName}
                lastName={student.lastName}
                id={student._id}
                phoneNumber={student.phoneNumber}
                courses={student.courses}
                streetAddress={student.streetAddress}
                miscAddress={student.miscAddress}
              />
            </div>
          </p>
        );
      }
    });
    return (
      <div className="course-page">
        <div className="nav-options">
          <ul>
            <li>
              <Link to={`/addStudent/${this.props.match.params.cuid}`}>
                Add a new student
              </Link>
            </li>
            <li>
              <Link to={`/editCourse/${this.props.match.params.cuid}`}>
                Edit Course Name
              </Link>
            </li>
            <li>
              <Link to="/auth/dashboard" onClick={this.deleteCourse}>
                Remove this course
              </Link>
            </li>
            <li>
              <Link to="/auth/dashboard" onClick={this.handleRedirect}>
                Back to Your Dashboard
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={this.handleLogout}>Log out </Link>
            </li>
          </ul>
        </div>
        <h1>{this.props.course.name}</h1>
        <h2>Your Students</h2>
        <div className="studentList">
          {currentStudents}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    course: state.course.course,
    student: state.student.students,
  };
};

export default connect(mapStateToProps)(CoursePage);
