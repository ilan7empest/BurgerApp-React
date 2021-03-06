import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary';
// import axios from "../../axios-orders"

const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.reqIntr = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resIntr = axios.interceptors.response.use(
        (res) => res,
        (err) => {
          this.setState({ error: err });
        }
      );
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqIntr);
      axios.interceptors.response.eject(this.resIntr);
    }
    errorConfirmHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal isVisible={this.state.error} closeModal={this.errorConfirmHandler}>
            <div className='modal-body'>{this.state.error ? this.state.error.message : null}</div>
          </Modal>
          <WrapperComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
