import * as actionTypes from '../_actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_ORDER_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.SUBMIT_ORDER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SUBMIT_ORDER_SUCCESS:
      const newOrder = {
        ...action.payload,
        id: action.orderId,
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true,
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
