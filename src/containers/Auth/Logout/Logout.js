import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreator from '../../../store/_actions';

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
    //   this.props.history.push('/');
  }
  render() {
    return <Redirect to='/' />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actionCreator.logout()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
