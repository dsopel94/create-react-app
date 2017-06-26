import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class ShowStudentInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      student: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        id: '',
      },
      isClickedEdit: false,
      isClickedDelete: false,
      isClicked: false,
    };
    this.isClickedEdit = this.isClickedEdit.bind(this);
    this.isClickedDelete = this.isClickedDelete.bind(this);
    this.isClicked = this.isClicked.bind(this);
  }

  isClickedEdit(event) {
    event.preventDefault();
    this.setState({
      isClickedEdit: !this.state.isClickedEdit,
    });
    window.location.href = `http://localhost:3000/editStudent/${this.props.id}`;
  }

  isClickedDelete(event) {
    event.preventDefault();
    this.setState({
      isClickedDelete: !this.state.isClickedDelete,
    });
    this.props.dispatch(actions.deleteStudent(event.target.id));
    console.log(event.target.id, 'Check target id');
    window.location.href = `http://localhost:3000/courses/${this.props.courses}`;
  }

  isClicked(event) {
    event.preventDefault();
    this.setState({
      isClicked: !this.state.isClicked,
    });
  }
  render() {
    return (
      <div className="student-info-container">
        <button
          className="students"
          onClick={this.isClicked}
          courses={this.props.courses}
          id={this.props.id}
        >
          {this.props.firstName} {this.props.lastName}
        </button>
        {this.state.isClicked &&
          <div className="student-info">
            <div className="student-info-box">
              <p>Name: {this.props.firstName} {this.props.lastName}</p>
              <p>Phone Number: {this.props.phoneNumber}</p>
              <p>Street Address: {this.props.streetAddress} </p>
              <p> Street Address Line 2: {this.props.miscAddress} </p>
              <button
                id="edit-student"
                id={this.props.id}
                onClick={this.isClickedEdit}
              >
                Edit Student Info
              </button>
              <button
                id="delete-student"
                id={this.props.id}
                onClick={this.isClickedDelete}
              >
                Delete Student
              </button>
            </div>
          </div>}
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

export default connect(mapStateToProps)(ShowStudentInfo);
