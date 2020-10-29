import * as actionTypes from '../_actions/actionTypes';
const initialState = {
  ingredients: null,
  totalPrice: 4,
  loading: false,
  error: false,
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
    case actionTypes.FETCH_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingr.salad,
          cheese: action.ingr.cheese,
          bacon: action.ingr.bacon,
          meat: action.ingr.meat,
        },
        error: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAIL:
      return {
        ...state,
        error: true,
      };
    default:
      break;
  }
  return state;
};

export default reducer;
