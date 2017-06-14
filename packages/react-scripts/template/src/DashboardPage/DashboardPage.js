import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import Cookies from 'universal-cookie';
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

    return <div className="greeting"> Hello,{this.props.fullName}</div>;
  }
}
function mapStateToProps(state) {
  return {
    fullName: state.auth.fullName,
  };
}

export default connect(mapStateToProps, actions)(DashboardPage);
