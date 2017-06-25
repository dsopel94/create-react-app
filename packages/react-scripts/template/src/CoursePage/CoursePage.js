import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import ShowStudentInfo from '../ShowStudentInfo/ShowStudentInfo';

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
  }

  onClick(event) {
    event.preventDefault();
    console.log(this.state.isClicked);
    this.setState({
      isClicked: !this.state.isClicked,
    });
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
      <div>
        <h1>{this.props.course.name}</h1>
        <Link to={`/addStudent/${this.props.match.params.cuid}`}>
          {' '}Add a new student
        </Link>
        <div className="studentList">Your students{currentStudents} </div>
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
