import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class DashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      fullName: '',
      course: {},
    };
    console.log(props);
  }
  render() {
    let inst = cookies.get('instructor');
    console.log('ins', inst);
    inst = inst.fullName;

    return <div className="greeting"> Hello, {inst}</div>;
  }
}
const mapStateToProps = state => {
  return {
    fullName: state.fullName,
  };
};

export default connect(mapStateToProps)(DashboardPage);
