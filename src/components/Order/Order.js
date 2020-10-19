import React, { Fragment } from 'react';

const order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }
  let ingredientOutput = ingredients.map((ingredient, i) => {
    return (
      <li
        className='list-group-item d-flex justify-content-between align-items-center'
        key={i}
      >
        <span className='mr-3'>{ingredient.name}</span>
        <span className='badge badge-primary badge-pill'>
          {ingredient.amount}
        </span>
      </li>
    );
  });
  return <Fragment>{ingredientOutput}</Fragment>;
};

export default order;
