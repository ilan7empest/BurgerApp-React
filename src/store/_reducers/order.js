import * as actionTypes from '../_actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_ORDER_INIT:
      return updateObject(state, { purchased: false });
    case actionTypes.SUBMIT_ORDER_START:
      return updateObject(state, { loading: true });
    case actionTypes.SUBMIT_ORDER_SUCCESS:
      const newOrder = updateObject(action.payload, { id: action.orderId });
      return updateObject(state, {
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true,
      });
    case actionTypes.SUBMIT_ORDER_FAIL:
      return updateObject(state, { loading: false });
    default:
      return state;
  }
};

export default reducer;
