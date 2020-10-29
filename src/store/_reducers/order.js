import * as actionTypes from '../_actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_ORDER_SUCCESS:
      const newOrder = {
        ...action.payload,
        id: action.orderId,
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
      };
    case actionTypes.SUBMIT_ORDER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
