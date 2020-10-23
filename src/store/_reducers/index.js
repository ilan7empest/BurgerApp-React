import * as actionTypes from '../_actions';
const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 1,
  },
  totalPrice: 4,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGERDIANT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient.name]:
            state.ingredients[action.ingredient.name] + 1,
        },
        totalPrice:
          state.totalPrice + action.ingredient.price[action.ingredient.name],
      };
    case actionTypes.REMOVE_INGERDIANT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient.name]:
            state.ingredients[action.ingredient.name] - 1,
        },
        totalPrice:
          state.totalPrice - action.ingredient.price[action.ingredient.name],
      };
    default:
      break;
  }
  return state;
};

export default rootReducer;
