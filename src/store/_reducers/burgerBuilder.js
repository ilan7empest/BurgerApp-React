import * as actionTypes from '../_actions/actionTypes';
const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 1,
  },
  totalPrice: 4,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
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
    case actionTypes.REMOVE_INGREDIENT:
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

export default reducer;
