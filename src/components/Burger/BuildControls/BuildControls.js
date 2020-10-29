import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';
import Button from '../../UI/Button/Button';

const controls = [
  { label: 'Salad', name: 'salad' },
  { label: 'Cheese', name: 'cheese' },
  { label: 'Bacon', name: 'bacon' },
  { label: 'Meat', name: 'meat' },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p className='text-center'>
        Total Price: $<b>{props.price.toFixed(2)}</b>
      </p>
      {controls.map((control) => {
        return (
          <BuildControl
            label={control.label}
            key={control.label}
            add={() => props.addIngredient(control.name)}
            remove={() => props.removeIngredient(control.name)}
            disabled={props.disabled[control.name]}
          />
        );
      })}
      <Button
        class={classes.OrderButton + ' my-4'}
        click={props.clickPurchase}
        type='button'
        disabled={!props.isPurchase}
      >
        ORDER NOW
      </Button>
    </div>
  );
};

export default buildControls;
