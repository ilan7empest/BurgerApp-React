import * as actionTypes from './actionTypes';

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
