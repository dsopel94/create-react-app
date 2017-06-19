import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import CourseList from '../CourseList/CourseList.js';
const cookies = new Cookies();

class DashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: {},
    };
    console.log(props);
  }
  render() {
    let inst = cookies.get('instructor');
    console.log('ins', inst);
    inst = inst.fullName;

    return (
      <div>
        <div className="greeting"> Welcome Back, {this.props.fullName}</div>
        <div className="addCourseLink">
          <Link to="/addCourse">Add a new course </Link>
        </div>
        <div className="dashboard-your-courses"><h2>Your Courses</h2></div>
        <div className="courseList"><CourseList /></div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    fullName: state.auth.fullName,
    coursename: state.course.coursename,
  };
}

export default connect(mapStateToProps, actions)(DashboardPage);
