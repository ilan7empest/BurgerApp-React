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

export const submitOrderStart = (orderData) => {
  return (dispatch) => {
    axiosInstance
      .post('/orders.json', orderData)
      .then((res) => {
        dispatch(submitOrderSuccess(res.data.name, orderData));
        // this.props.history.push('/');
      })
      .catch((err) => {
        dispatch(submitOrderSuccess(err));
      });
  };
};
