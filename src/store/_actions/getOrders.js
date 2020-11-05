import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};
export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: orders,
  };
};
export const fetchOrdersFail = (err) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: err,
  };
};

export const deleteOrder = (orderId) => {
  return {
    type: actionTypes.DELETE_ORDER,
    orderId: orderId,
  };
};

export const fetchOrdersInit = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const query = `auth=${token}&orderBy="userId"&equalTo="${userId}" `;
    axiosInstance
      .get('orders.json?' + query)
      .then((res) => {
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchOrders));
        // return fetchOrders;
      })

      //   .then((orders) => this.setState({ orders: orders, loading: false }))
      //   .then(() => console.log(this.state.orders))
      .catch((err) => dispatch(fetchOrdersFail(err)));
  };
};
