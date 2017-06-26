import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class EditCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      submitted: false,
      _creator: {},
    };
    this.updateName = this.updateName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    //cookies.remove('instructor');
    cookies.remove('token');
  }

  updateName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    const instructor = cookies.get('instructor')._id;
    console.log(cookies.get('instructor')._id);
    this.setState({
      submitted: true,
    });
    this.props.dispatch(actions.editCourse(name, this.props.match.params.cuid));
    console.log(this.props.name);
    console.log(name, cookies.get('instructor')._id);
  }

  render() {
    if (this.state.submitted) {
      window.location.href = `http://localhost:3000/courses/${this.props.match.params.cuid}`;
    }
    return (
      <form action="/" onSubmit={this.onSubmit}>
        <div className="edit-course-nav-options">
          <ul>
            <li>
              <Link to={`/courses/${this.props.match.params.cuid}`}>
                Back to Your Course
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={this.handleLogout}>Log out </Link>
            </li>
          </ul>
        </div>
        <div className="container">
          <div className="submitForm">
            <div className="field-line">
              <label htmlFor="coursename">Course Name:</label>
              <input
                id="coursename"
                name="coursename"
                value={this.state.name}
                onChange={this.updateName}
              />
            </div>
            <button type="submit" className="add-course">Edit Course</button>
          </div>
        </div>
      </form>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    name: state.course.coursename,
    _creator: state.course._creator,
  };
};
export default connect(mapStateToProps)(EditCoursePage);
