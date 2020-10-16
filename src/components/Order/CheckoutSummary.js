import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

const checkoutSummary = (props) => {
  return (
    <div className='text-center'>
      <h1 className='mb-5'>Enjoy your food</h1>
      <Burger ingredients={props.ingredients} />
      <Button type='button' class='btn btn-danger mr-4' click={props.cancel}>
        Cancel
      </Button>
      <Button type='button' class='btn btn-primary' click={props.checkout}>
        Finish Order
      </Button>
    </div>
  );
};

export default checkoutSummary;
