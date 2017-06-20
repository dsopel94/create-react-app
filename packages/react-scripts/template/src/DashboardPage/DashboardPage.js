import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import CourseList from '../CourseList/CourseList.js';
import axios from 'axios';
//import router from '../server/controllers/course.controller.js'
const cookies = new Cookies();

class DashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      courses: {},
    };
    console.log(props);
  }

  componentDidMount() {
    axios.get('http://localhost:3001/courses').then(response => {
      const courses = response.data.courses;
      const userIds = Object.keys(courses).map(
        course => courses[course]._creator
      );
      this.setState({
        courses: response.data.courses,
      });
    });
  }
  render() {
    let inst = cookies.get('instructor').fullName;
    console.log('ins', inst);

    let courseList = this.state.courses;
    let courses = Object.keys(courseList).map(course => courseList[course]);
    const courseButtons = courses.map(course => {
      return (
        <p>
          <button className="courses" id={course._id}>{course.name}</button>
        </p>
      );
    });
    return (
      <div>
        <div className="greeting"> Welcome Back, {inst}</div>
        <div className="addCourseLink">
          <Link to="/addCourse">Add a new course </Link>
        </div>
        <div className="dashboard-your-courses"><h2>Your Courses</h2></div>
        <div className="courseList">{courseButtons}</div>
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
