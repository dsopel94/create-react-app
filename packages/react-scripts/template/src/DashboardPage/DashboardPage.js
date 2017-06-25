import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import CourseList from '../CourseList/CourseList.js';
import axios from 'axios';
import { Redirect } from 'react-router';
//import router from '../server/controllers/course.controller.js'
const cookies = new Cookies();

class DashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      courses: {},
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    window.location = '/courses/' + event.target.id;
  }
  componentWillMount() {
    //this.props.dispatch(actions.getCourses());
  }
  componentDidMount() {
    this.props.dispatch(actions.getCourses());
    // axios.get('http://localhost:3001/courses').then(response => {
    //   const courses = response.data.courses;
    //   const userIds = Object.keys(courses).map(
    //     course => courses[course]._creator
    //   );
    //   this.setState({
    //     courses: response.data.courses,
    //   });
    // });
  }
  render() {
    let inst = cookies.get('instructor').fullName;
    let courseList = this.props.courses;
    let courses = Object.keys(courseList).map(course => courseList[course]);
    const courseButtons = courses.map(course => {
      if (cookies.get('instructor')._id == course._creator) {
        return (
          <p>
            <button className="courses" onClick={this.onClick} id={course._id}>
              {course.name}
            </button>
          </p>
        );
      }
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
const mapStateToProps = (state, props) => {
  return {
    fullName: state.auth.fullName,
    coursename: state.course.coursename,
    courses: state.course.courses,
  };
};

export default connect(mapStateToProps)(DashboardPage);
