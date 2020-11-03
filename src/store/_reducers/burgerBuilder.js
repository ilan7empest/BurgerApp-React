import * as actionTypes from '../_actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
  ingredients: null,
  totalPrice: 4,
  loading: false,
  error: false,
  building: false,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredient.name]: state.ingredients[action.ingredient.name] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice:
      state.totalPrice + action.ingredient.price[action.ingredient.name],
    building: true,
  };
  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
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
        building: true,
      };
    case actionTypes.FETCH_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingr.salad,
          cheese: action.ingr.cheese,
          bacon: action.ingr.bacon,
          meat: action.ingr.meat,
        },
        totalPrice: 4,
        error: false,
        building: false,
      });
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
