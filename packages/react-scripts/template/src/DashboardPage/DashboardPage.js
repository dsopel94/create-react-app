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
    axios.get('localhost:3001/courses').then(response => {
      console.log(
        'I am getting the response from axios courses here!',
        response.data
      );
      console.log(this);
      this.setState({
        courses: response.data,
      });
    });
  }
  render() {
    let inst = cookies.get('instructor');
    console.log('ins', inst);
    inst = inst.fullName;
    //CourseController.getAllCourses((req,res) => {
    //console.log(res.data)
    //})
    return (
      <div>
        <div className="greeting"> Welcome Back, {this.props.fullName}</div>
        <div className="addCourseLink">
          <Link to="/addCourse">Add a new course </Link>
        </div>
        <div className="dashboard-your-courses"><h2>Your Courses</h2></div>
        <div className="courseList">{this.state.courses.name}</div>
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
