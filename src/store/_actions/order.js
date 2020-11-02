import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

export const submitOrderSuccess = (id, orderData) => {
  return {
    type: actionTypes.SUBMIT_ORDER_SUCCESS,
    orderId: id,
    payload: orderData,
  };
};

export const submitOrderFail = (error) => {
  return {
    type: actionTypes.SUBMIT_ORDER_FAIL,
    error: error,
  };
};

export const submitOrderStart = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_START,
  };
};

export const submitOrder = (token, orderData) => {
  return (dispatch) => {
    dispatch(submitOrderStart());
    axiosInstance
      .post('/orders.json?auth=' + token, orderData)
      .then((res) => {
        dispatch(submitOrderSuccess(res.data.name, orderData));
        // this.props.history.push('/');
      })
      .catch((err) => {
        dispatch(submitOrderSuccess(err));
      });
  };
};

export const submitOrderInit = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_INIT,
  };
};
