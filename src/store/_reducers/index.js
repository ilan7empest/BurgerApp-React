import { combineReducers } from 'redux';
import authReducer from './auth';
import burgerReducer from './burgerBuilder';
import orderReducer from './order';
import getOrdersReducer from './getOrders';

const rootReducer = combineReducers({
  auth: authReducer,
  burgerReducer: burgerReducer,
  orderReducer: orderReducer,
  getOrdersReducer: getOrdersReducer,
});

export default rootReducer;
