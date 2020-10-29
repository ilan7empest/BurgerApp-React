import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

export const addIngredient = (name, price) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: {
      name: name,
      price: price,
    },
  };
};

export const removeIngredient = (name, price) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: {
      name: name,
      price: price,
    },
  };
};

export const fetchIngredients = (ingr) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS,
    ingr: ingr,
  };
};
export const fetchIngredientsFail = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAIL,
  };
};
export const initIngredients = () => {
  return (dispatch) => {
    axiosInstance
      .get('ingredients.json')
      .then((res) => {
        // this.setState({ ingredients: res.data });
        dispatch(fetchIngredients(res.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientsFail());
      });
  };
};
