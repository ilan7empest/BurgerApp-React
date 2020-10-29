import { combineReducers } from 'redux';
import burgerReducer from './burgerBuilder';
import orderReducer from './order';

const rootReducer = combineReducers({
  burgerReducer: burgerReducer,
  orderReducer: orderReducer,
});

export default rootReducer;
