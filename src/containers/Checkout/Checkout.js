import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      meat: 1,
      salad: 1,
    },
  };
  render() {
    return <CheckoutSummary ingredients={this.state.ingredients} />;
  }
}

export default Checkout;
