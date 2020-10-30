import { combineReducers } from 'redux';
import burgerReducer from './burgerBuilder';
import orderReducer from './order';
import getOrdersReducer from './getOrders';

const rootReducer = combineReducers({
  burgerReducer: burgerReducer,
  orderReducer: orderReducer,
  getOrdersReducer: getOrdersReducer,
});

export default rootReducer;
